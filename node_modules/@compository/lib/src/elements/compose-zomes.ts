import {
  Constructor,
  css,
  html,
  LitElement,
  property,
  query,
} from 'lit-element';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';

import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CheckListItem } from 'scoped-material-components/mwc-check-list-item';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { sharedStyles } from './sharedStyles';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { TextField } from 'scoped-material-components/mwc-textfield';
import {
  Dictionary,
  HoloHashed,
  serializeHash,
} from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { DnaTemplate, ZomeDef, ZomeDefReference } from '../types/dnas';
import { InstallDnaDialog } from './install-dna-dialog';
import { CompositoryService } from '../services/compository-service';
import { generateDnaBundle } from '../processes/generate-dna-bundle';
import { BaseElement } from '@holochain-open-dev/common';
import { BaseCompositoryService } from './base';

export abstract class ComposeZomes extends BaseCompositoryService {
  @property()
  zomeDefs!: Array<HoloHashed<ZomeDef>>;

  @query('#install-dna-dialog')
  _installDnaDialog!: InstallDnaDialog;

  _dnaTemplateToClone: string | undefined = undefined;

  _selectedIndexes: Set<number> = new Set();
  @property()
  _templateName: string | undefined = undefined;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }

  firstUpdated() {
    this.loadZomes();
  }

  async loadZomes() {
    // TODO: fix this
    const allZomeDefs = await this._compositoryService.getAllZomeDefs();

    const zomeDefsByName: Dictionary<HoloHashed<ZomeDef>> = {};
    for (const zomeDef of allZomeDefs) {
      zomeDefsByName[zomeDef.content.name] = zomeDef;
    }

    this.zomeDefs = Object.values(zomeDefsByName);
  }

  async createDnaTemplate() {
    const zomeDefs: Array<HoloHashed<ZomeDef>> = Array.from(
      this._selectedIndexes
    ).map(i => this.zomeDefs[i]);

    const zomeDefReferences: Array<ZomeDefReference> = zomeDefs.map(def => ({
      name: def.content.name,
      zome_def_hash: def.hash,
    }));
    const dnaTemplate: DnaTemplate = {
      name: this._templateName as string,
      zome_defs: zomeDefReferences,
    };
    try {
      this._dnaTemplateToClone = await this._compositoryService.publishDnaTemplate(
        dnaTemplate
      );

      const uuid = '';
      const properties: any[] = [];

      const dnaBundle = await generateDnaBundle(
        this._compositoryService,
        dnaTemplate,
        uuid,
        properties
      );

      this._installDnaDialog.dnaBundle = dnaBundle;
      this._installDnaDialog.open();
    } catch (e) {
      (this.shadowRoot?.getElementById('error-snackbar') as Snackbar).show();
    }
  }

  async publishInstantiatedDna(cellId: CellId) {
    if (this._dnaTemplateToClone) {
      await this._compositoryService.publishInstantiatedDna({
        dna_template_hash: this._dnaTemplateToClone,
        instantiated_dna_hash: serializeHash(cellId[0]),
        properties: null, // TODO
        uuid: '',
      });
    }
  }

  renderErrorSnackbar() {
    return html`
      <mwc-snackbar
        id="error-snackbar"
        labelText="Couldn't generate the DNA due to gossip inconsistencies. Please try again in a few minutes."
      ></mwc-snackbar>
    `;
  }

  render() {
    if (!this.zomeDefs)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;

    return html` ${this.renderErrorSnackbar()}
      <install-dna-dialog
        id="install-dna-dialog"
        @dna-installed=${(e: CustomEvent) =>
          this.publishInstantiatedDna(e.detail.cellId)}
      ></install-dna-dialog>
      <mwc-card class="fill">
        <div class="column fill" style="margin: 16px; min-height: 0px;">
          <span class="title">Compose zomes</span>
          <mwc-list
            style="overflow-y: auto; flex: 1;"
            multi
            @selected=${(e: CustomEvent) =>
              (this._selectedIndexes = e.detail.index)}
          >
            ${this.zomeDefs.map(
              zomeDef => html`
                <mwc-check-list-item
                  .selected=${zomeDef.content.name === 'blocky' ||
                  zomeDef.content.name === 'profiles'}
                  .disabled=${zomeDef.content.name === 'blocky' ||
                  zomeDef.content.name === 'profiles'}
                >
                  ${zomeDef.content.name}
                </mwc-check-list-item>
              `
            )}
          </mwc-list>

          <div class="column">
            <mwc-textfield
              @input=${(e: CustomEvent) =>
                (this._templateName = (e.target as any).value)}
              label="Dna Template Name"
              style="margin-bottom: 16px;"
              required
            ></mwc-textfield>

            <mwc-button
              .disabled=${!this._templateName}
              raised
              label="GENERATE DNA"
              @click=${() => this.createDnaTemplate()}
            ></mwc-button>
          </div>
        </div>
      </mwc-card>`;
  }

  getScopedElements() {
    const compositoryService = this._compositoryService;
    return {
      'mwc-list': List,
      'mwc-check-list-item': CheckListItem,
      'mwc-circular-progress': CircularProgress,
      'mwc-button': Button,
      'mwc-textfield': TextField,
      'install-dna-dialog': class extends InstallDnaDialog {
        get _compositoryService() {
          return compositoryService;
        }
      } as typeof HTMLElement,
      'mwc-card': Card,
      'mwc-snackbar': Snackbar,
    };
  }
}
