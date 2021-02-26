import {
  Constructor,
  css,
  html,
  LitElement,
  property,
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
  esm,
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
// @ts-ignore
import grapesCss from 'grapesjs/dist/css/grapes.min.css';

export abstract class DnaGrapes extends Scoped(LitElement) {
  @property({ type: Array })
  cellId!: CellId;

  @property({ type: Boolean })
  _profilesZomeExistsInDna = false;
  @property({ type: Boolean })
  _profileAlreadyCreated = false;

  @property({ type: Boolean })
  _editing = false;

  @property({ type: Boolean })
  _loading = true;

  // Grapes sub-elements
  @query('#grapes-container')
  _grapesContainer!: HTMLElement;
  @query('#block-manager')
  _blockManager!: HTMLElement;
  @query('#panel-top')
  _panelTop!: HTMLElement;
  @query('#panel-switcher')
  _panelSwitcher!: HTMLElement;
  @query('#styles-container')
  _stylesContainer!: HTMLElement;
  @query('#editor-row')
  _editorRow!: HTMLElement;

  _editor!: any;

  @property({ type: String })
  _activePanel: 'styles' | 'blocks' = 'blocks';

  abstract get _compositoryService(): CompositoryService;

  async firstUpdated() {
    await this.loadProfilesExists();

    await this.loadSavedNodes();

    const renderers = await this.loadRenderers();

    this._loading = false;

    this._editor = grapesjs.init({
      container: this._grapesContainer,
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: false,
      // Disable the storage manager for the moment
      storageManager: false,
      height: 'auto',
      /*
      width: 'auto', */
      panels: {
        defaults: [
          {
            id: 'panel-switcher',
            el: this._panelSwitcher,
            buttons: [
              {
                id: 'show-style',
                label: 'Styles',
                command: 'show-styles',
                togglable: false,
              },
              {
                id: 'show-blocks',
                active: true,
                label: 'Blocks',
                command: 'show-blocks',
                togglable: false,
              },
            ],
          },
        ],
      },
      blockManager: {
        appendTo: this._blockManager,
        blocks: [
          {
            id: 'section', // id is mandatory
            label: '<b>Section</b>', // You can use HTML/SVG inside labels
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
        ],
      },
      selectorManager: {
        appendTo: this._stylesContainer,
      },
      styleManager: {
        appendTo: this._stylesContainer,
        sectors: [
          {
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: 'integer',
                name: 'The width', // Label for the property
                property: 'width', // CSS property (if buildProps contains it will be extended)
                units: ['px', '%'], // Units, available only for 'integer' types
                defaults: 'auto', // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
              {
                id: 'custom-prop',
                name: 'Custom Label',
                property: 'font-size',
                type: 'select',
                defaults: '32px',
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: '12px', name: 'Tiny' },
                  { value: '18px', name: 'Medium' },
                  { value: '32px', name: 'Big' },
                ],
              },
            ],
          },
        ],
      },
    });

    this._editor.Panels.addPanel({
      id: 'panel-top',
      el: this._panelTop,
    });
    this._editor.Commands.add('show-styles', {
      run: (editor: any, sender: any) => {
        this._activePanel = 'styles';
      },
    });
    this._editor.Commands.add('show-blocks', {
      run: (editor: any, sender: any) => {
        this._activePanel = 'blocks';
      },
    });

    const innerWindow = this._editor.Canvas.getWindow();
    innerWindow.appWebsocket = this._compositoryService.appWebsocket;
    innerWindow.cellId = this.cellId;

    const promises = renderers.map(([zomeDef, setupLensesFile]) =>
      this.addZomeLenses(zomeDef, setupLensesFile)
    );

    await Promise.all(promises);
  }

  esm(js: string) {
    return (
      'data:text/javascript;base64,' + btoa(unescape(encodeURIComponent(js)))
    );
  }
  async addZomeLenses(zomeDef: ZomeDef, setupLensesFile: File) {
    // prettier-ignore
    //eslint-disable-next-line
    const text = await setupLensesFile.text();

    // prettier-ignore
    const lensesModule = await import(this.esm(text));
    const lenses: Lenses = lensesModule.default(
      this._compositoryService.appWebsocket,
      this.cellId
    );

    for (let i = 0; i < lenses.standalone.length; i++) {
      const lens = lenses.standalone[i];
      // prettier-ignore
      const script = await import(this.esm(
"export default function render() {"+
"      function esm(js) {"+
"        return ("+
"          'data:text/javascript;base64,' + btoa(unescape(encodeURIComponent(js)))"+
"        );"+
"      }"+
"  "+
"      async function setupLenses() {"+
"        if (window."+zomeDef.name+") return;"+
    //eslint-disable-next-line
    "        const mod = await import(esm(`"+text.replace(/\`/g, '\\`')+"`));"+
"        window."+zomeDef.name+" = mod.default(window.appWebsocket, window.cellId);"+
"      }"+
"      "+
"      setupLenses().then(()=> {"+
"        window."+zomeDef.name+".standalone["+i+"].render(this)"+
"      });"+
"  }" 
));

      const componentName = `${zomeDef.name}: ${lens.name}`;

      this._editor.Components.addType(componentName, {
        model: {
          defaults: {
            script: script.default,
          },
        },
      });

      this._editor.BlockManager.add(`block-${zomeDef.name}-${lens.name}`, {
        label: lens.name,
        content: {
          type: componentName,
        },
      });
    }
  }

  async loadSavedNodes() {
    /*     const myNodes = await this.grapesService.getMyBoardNodes();

    if (myNodes.length === 0) {
      const allNodes = await this.grapesService.getAllBoardNodes();
      this._savedBlockNode = allNodes[0];
    } else {
      this._savedBlockNode = myNodes[0];
    }

    this._editing = !this._savedBlockNode;
 */
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

    const blocks = zomeLenses.filter(
      ([def, setupLenses]) => setupLenses !== undefined
    ) as [ZomeDef, File][];

    return blocks;
  }

  async createBoard() {
    /*     this._editing = false;
    if (JSON.stringify(this._savedBlockNode) !== JSON.stringify(layout)) {
      this._savedBlockNode = layout;
      await this.grapesService.createBoardNode(layout);
    }
 */
  }

  showProfilePromt() {
    return (
      !this._loading &&
      this._profilesZomeExistsInDna &&
      !this._profileAlreadyCreated
    );
  }

  renderBarItems() {
    /* if (this._loading || this.showProfilePromt()) */ return html``;
    /*     if (!this._editing)
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
          .disabled=${!this.board || this.board.isEditingLayoutEmpty()}
          class="white-button"
          @click=${() => {
            const newLayout = this.board.save();
            this.createBoard(newLayout);
          }}
        ></mwc-button>
        ${this._savedBlockNode
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
 */
  }

  renderActivePanel() {
    return html` <div
        id="styles-container"
        style=${styleMap({
          display: this._activePanel === 'styles' ? 'block' : 'none',
        })}
      ></div>
      <div
        id="block-manager"
        style=${styleMap({
          display: this._activePanel === 'blocks' ? 'block' : 'none',
        })}
      ></div>`;
  }

  renderContent() {
    return html`
      <div class="column" style="flex: 1;">
        <div class="panel__top" id="panel-top">
          <div class="panel__basic-actions"></div>
          <div class="panel__switcher" id="panel-switcher"></div>
        </div>
        <div id="editor-row">
          <div id="editor-canvas">
            <div id="grapes-container"></div>
          </div>
          <div class="panel__right">${this.renderActivePanel()}</div>
        </div>
      </div>
    `;

    /*     if (this._loading)
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
    else
      return html`
        <block-board
          id="board"
          style="flex: 1;"
          .editing=${this._editing}
          .blockSets=${this._blockSets}
          .initialBlockLayout=${this._savedBlockNode}
          @layout-updated=${() => this.requestUpdate()}
        ></block-board>
      `; */
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
        }
        .white-button {
          --mdc-button-disabled-ink-color: rgba(255, 255, 255, 0.5);
          --mdc-theme-primary: white;
        }
        /* Let's highlight canvas boundaries */
        #grapes-container {
          border: 3px solid #444;
          flex: 1;
        }
        #editor-row {
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          flex-wrap: nowrap;
          flex: 1;
        }

        #editor-canvas {
          flex-grow: 1;
          display: flex;
        }

        /* Reset some default styling */
        .gjs-cv-canvas {
          top: 0;
          width: 100%;
          height: 100%;
        }

        .gjs-block {
          width: auto;
          height: auto;
          min-height: auto;
        }
        .panel__switcher {
          position: initial;
        }
        .panel__right {
          flex-basis: 230px;
          position: relative;
          overflow-y: auto;
        }

        .panel__top {
          padding: 0;
          width: 100%;
          display: flex;
          position: initial;
          justify-content: center;
          justify-content: space-between;
        }
        .panel__basic-actions {
          position: initial;
        }
      `,
    ];
  }
}
