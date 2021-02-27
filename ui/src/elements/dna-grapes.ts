import {
  Constructor,
  css,
  html,
  LitElement,
  property,
  PropertyValues,
  query,
} from 'lit-element';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';

import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { serializeHash } from '@holochain-open-dev/core-types';
import { styleMap } from 'lit-html/directives/style-map';
import { TopAppBar } from 'scoped-material-components/mwc-top-app-bar';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { CreateProfileForm } from '@holochain-open-dev/profiles';
import {
  CompositoryService,
  fetchLensesForAllZomes,
  Lenses,
  SetupLenses,
  ZomeDef,
} from '@compository/lib';
import { sharedStyles } from '../sharedStyles';
import { GrapesService } from '../grapes.service';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';
//@ts-ignore
import grapesjs from 'grapesjs';
//@ts-ignore
import webpagePreset from 'grapesjs-preset-webpage';
// @ts-ignore
import grapesCss from 'grapesjs/dist/css/grapes.min.css';
import { RenderTemplate } from '../types';
import { esm } from '../utils';

export abstract class DnaGrapes extends Scoped(LitElement) {
  @property({ type: Array })
  cellId!: CellId;

  @property({ type: Boolean })
  _profilesZomeExistsInDna = false;
  @property({ type: Boolean })
  _profileAlreadyCreated = false;

  @property({ type: Boolean })
  _editing = true;

  @property({ type: Boolean })
  _loading = true;

  @query('#grapes-container')
  _grapesContainer!: HTMLElement;

  _zomeLenses!: [ZomeDef, File][];
  _templateToRender: RenderTemplate | undefined = undefined;

  abstract get _compositoryService(): CompositoryService;
  abstract get _grapesService(): GrapesService;

  _editor: any | undefined = undefined;

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (
      (this._loading === false && changedValues.has('_editing')) ||
      (changedValues.has('_loading') && this._loading === false)
    ) {
      if (this._editing) {
        this.setupGrapes();
      } else {
        this.setupRenderIframe();
      }
    }
  }

  async firstUpdated() {
    await Promise.all([
      this.loadProfilesExists(),
      this.loadRenderTemplate(),
      this.loadRenderers(),
    ]);

    this._loading = false;
  }

  async setupRenderIframe() {
    const iframe = this.shadowRoot?.getElementById(
      'render-iframe'
    ) as HTMLIFrameElement;

    this.setupIframe(iframe);

    const promises = this._zomeLenses.map(
      async ([zomeDef, setupLensesFile]) => {
        const text = await setupLensesFile.text();

        this.addZomeLensesToIframe(zomeDef, text, iframe);
      }
    );

    await Promise.all(promises);

    if (this._templateToRender) {
      const innerDocument = iframe.contentDocument as Document;

      const styleEl = innerDocument.createElement('style');

      styleEl.innerHTML = this._templateToRender.css;
      innerDocument.body.innerHTML = this._templateToRender.html;
      innerDocument.body.appendChild(styleEl);
      setTimeout(() => this.addRenderTemplateJs(iframe));
    }
  }

  async setupGrapes() {
    this._editor = grapesjs.init({
      container: this.shadowRoot?.getElementById('grapes-container'),
      components: this._templateToRender ? this._templateToRender.html : null,
      style: this._templateToRender ? this._templateToRender.css : null,
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: false,
      // Disable the storage manager for the moment
      storageManager: false,
      height: 'auto',
      jsInHtml: false,

      plugins: [webpagePreset],
      pluginsOpts: {
        [webpagePreset]: {
          navbarOpts: false,
          formsOpts: false,
          exportOpts: false,
          countdownOpts: false,
        },
      },
    });

    this._editor.Canvas.getFrameEl().addEventListener('load', async () => {
      const iframe = this._editor.Canvas.getFrameEl();
      this.setupIframe(iframe);

      const promises = this._zomeLenses.map(([zomeDef, setupLensesFile]) =>
        this.addZomeLensesToGrapes(zomeDef, setupLensesFile, this._editor)
      );
      await Promise.all(promises);

      this.addRenderTemplateJs(iframe);
    });
  }

  setupIframe(iframe: HTMLIFrameElement) {
    const innerWindow = iframe.contentWindow as Window;
    (innerWindow as any).appWebsocket = this._compositoryService.appWebsocket;
    (innerWindow as any).cellId = this.cellId;
    (innerWindow as any).zomes = {};
  }

  addRenderTemplateJs(iframe: HTMLIFrameElement) {
    const innerWindow = iframe.contentWindow as Window;

    if (this._templateToRender) {
      const s = innerWindow.document.createElement('script');
      s.innerHTML = this._templateToRender.js;
      innerWindow.document.body.appendChild(s);
    }
  }

  async addZomeLensesToGrapes(
    zomeDef: ZomeDef,
    setupLensesFile: File,
    editor: any
  ) {
    const text = await setupLensesFile.text();

    const iframeEl = editor.Canvas.getFrameEl();
    await this.addZomeLensesToIframe(zomeDef, text, iframeEl);

    const lensesModule = await import(esm(text));
    const lenses: Lenses = lensesModule.default(
      this._compositoryService.appWebsocket,
      this.cellId
    );

    for (let i = 0; i < lenses.standalone.length; i++) {
      const lens = lenses.standalone[i];

      // prettier-ignore
      const script = await import(esm(`
        export default function render() {
            window.zomes.${zomeDef.name}.lenses.standalone[${i}].render(this)
        }`
      ));

      const componentName = `${zomeDef.name}: ${lens.name}`;

      editor.Components.addType(componentName, {
        model: {
          defaults: {
            script: script.default,
          },
        },
      });

      editor.BlockManager.add(`block-${zomeDef.name}-${lens.name}`, {
        label: lens.name,
        attributes: {
          class: 'gjs-block fa fa-slideshare',
        },
        category: zomeDef.name,
        content: {
          type: componentName,
        },
      });
    }
  }

  async addZomeLensesToIframe(
    zomeDef: ZomeDef,
    setupLensesFileText: string,
    iframe: HTMLIFrameElement
  ) {
    const innerWindow = iframe.contentWindow as Window;
    const innerDocument = iframe.contentDocument as Document;
    (innerWindow as any).zomes[zomeDef.name] = { code: setupLensesFileText };

    const s = innerDocument.createElement('script');
    s.innerHTML = `function esm(js) {
      return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(js);
    }
    async function setupLenses() {
      if (window.zomes.${zomeDef.name}.lenses) return;
      const mod = await import(esm(window.zomes.${zomeDef.name}.code));
      window.zomes.${zomeDef.name}.lenses = mod.default(window.appWebsocket, window.cellId);
    }
    setupLenses()`;
    innerDocument.body.appendChild(s);
  }

  async loadRenderTemplate() {
    const templates = await this._grapesService.getAllRenderTemplates();

    if (templates.length > 0) {
      this._templateToRender = templates[0];
    }

    this._editing = !this._templateToRender;
  }

  async loadProfilesExists() {
    /*     const dnaTemplate = await this.compositoryService.getTemplateForDna(
      serializeHash(this.cellIdToDisplay[0])
    );
    this._profilesZomeExistsInDna = !!dnaTemplate.dnaTemplate.zome_defs.find(
      zome => zome.name === 'profiles'
    );

    if (this._profilesZomeExistsInDna) {
      const profileService = new ProfilesService(
        this.membraneContext.appWebsocket as AppWebsocket,
        this.cellIdToDisplay
      );

      const myProfile = await profileService.getMyProfile();
      this._profileAlreadyCreated = !!myProfile;
    }
 */
  }

  async loadRenderers() {
    // Get the renderers for each of the zomes
    const zomeLenses = await fetchLensesForAllZomes(
      this._compositoryService,
      this.cellId
    );

    this._zomeLenses = zomeLenses.filter(
      ([def, setupLenses]) => setupLenses !== undefined
    ) as [ZomeDef, File][];
  }

  showProfilePromt() {
    return (
      !this._loading &&
      this._profilesZomeExistsInDna &&
      !this._profileAlreadyCreated
    );
  }

  renderBarItems() {
    if (this._loading || this.showProfilePromt()) return html``;
    if (!this._editing)
      return html` <mwc-button
        icon="edit"
        slot="actionItems"
        label="Edit Layout"
        class="white-button"
        @click=${() => {
          this._editing = true;
        }}
      ></mwc-button>`;
    else {
      return html`<mwc-button
          icon="save"
          slot="actionItems"
          label="Save Layout"
          class="white-button"
          @click=${async () => {
            const editor = this._editor;

            const css = editor.getCss();
            const js = editor.getJs();
            const html = editor.getHtml();

            const template = { css, js, html };

            await this._grapesService.saveRenderTemplate(template);
            this._templateToRender = template;
            this._editing = false;
          }}
        ></mwc-button>
        ${this._templateToRender
          ? html`
              <mwc-button
                icon="close"
                slot="actionItems"
                class="white-button"
                label="Cancel"
                @click=${() => {
                  this._editing = false;
                }}
              ></mwc-button>
            `
          : html``} `;
    }
  }

  renderContent() {
    if (this._loading)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    else if (this.showProfilePromt())
      return html`
        <div
          style="flex: 1; display: flex; align-items: center; justify-content: center;"
        >
          <create-profile-form
            @profile-created=${() => (this._profileAlreadyCreated = true)}
          ></create-profile-form>
        </div>
      `;
    else if (this._editing) return html` <div id="grapes-container"></div> `;
    else return html` <iframe id="render-iframe" style="flex: 1;"></iframe> `;
  }

  render() {
    return html`
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div class="column" style="flex: 1;">
        <mwc-top-app-bar>
          <mwc-icon-button
            icon="arrow_back"
            slot="navigationIcon"
            class="white-button"
            @click=${() => this.dispatchEvent(new CustomEvent('navigate-back'))}
          ></mwc-icon-button>
          ${this.renderBarItems()}
        </mwc-top-app-bar>

        ${this.renderContent()}
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'mwc-top-app-bar': TopAppBar,
      'mwc-icon-button': IconButton,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
    };
  }

  static get styles() {
    return [
      sharedStyles,
      grapesCss,
      css`
        :host {
          display: flex;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        .white-button {
          --mdc-button-disabled-ink-color: rgba(255, 255, 255, 0.5);
          --mdc-theme-primary: white;
        }
        /* Let's highlight canvas boundaries */
        #grapes-container {
          flex: 1;
        }
      `,
    ];
  }
}
