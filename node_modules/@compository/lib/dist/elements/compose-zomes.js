import { __decorate } from "tslib";
import { css, html, property, query, } from 'lit-element';
import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CheckListItem } from 'scoped-material-components/mwc-check-list-item';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { sharedStyles } from './sharedStyles';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { serializeHash, } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { InstallDnaDialog } from './install-dna-dialog';
import { generateDnaBundle } from '../processes/generate-dna-bundle';
import { BaseCompositoryService } from './base';
export class ComposeZomes extends BaseCompositoryService {
    constructor() {
        super(...arguments);
        this._dnaTemplateToClone = undefined;
        this._selectedIndexes = new Set();
        this._templateName = undefined;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
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
        const zomeDefsByName = {};
        for (const zomeDef of allZomeDefs) {
            zomeDefsByName[zomeDef.content.name] = zomeDef;
        }
        this.zomeDefs = Object.values(zomeDefsByName);
    }
    async createDnaTemplate() {
        var _a;
        const zomeDefs = Array.from(this._selectedIndexes).map(i => this.zomeDefs[i]);
        const zomeDefReferences = zomeDefs.map(def => ({
            name: def.content.name,
            zome_def_hash: def.hash,
        }));
        const dnaTemplate = {
            name: this._templateName,
            zome_defs: zomeDefReferences,
        };
        try {
            this._dnaTemplateToClone = await this._compositoryService.publishDnaTemplate(dnaTemplate);
            const uuid = '';
            const properties = [];
            const dnaBundle = await generateDnaBundle(this._compositoryService, dnaTemplate, uuid, properties);
            this._installDnaDialog.dnaBundle = dnaBundle;
            this._installDnaDialog.open();
        }
        catch (e) {
            ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('error-snackbar')).show();
        }
    }
    async publishInstantiatedDna(cellId) {
        if (this._dnaTemplateToClone) {
            await this._compositoryService.publishInstantiatedDna({
                dna_template_hash: this._dnaTemplateToClone,
                instantiated_dna_hash: serializeHash(cellId[0]),
                properties: null,
                uuid: '',
            });
        }
    }
    renderErrorSnackbar() {
        return html `
      <mwc-snackbar
        id="error-snackbar"
        labelText="Couldn't generate the DNA due to gossip inconsistencies. Please try again in a few minutes."
      ></mwc-snackbar>
    `;
    }
    render() {
        if (!this.zomeDefs)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        return html ` ${this.renderErrorSnackbar()}
      <install-dna-dialog
        id="install-dna-dialog"
        @dna-installed=${(e) => this.publishInstantiatedDna(e.detail.cellId)}
      ></install-dna-dialog>
      <mwc-card class="fill">
        <div class="column fill" style="margin: 16px; min-height: 0px;">
          <span class="title">Compose zomes</span>
          <mwc-list
            style="overflow-y: auto; flex: 1;"
            multi
            @selected=${(e) => (this._selectedIndexes = e.detail.index)}
          >
            ${this.zomeDefs.map(zomeDef => html `
                <mwc-check-list-item
                  .selected=${zomeDef.content.name === 'blocky' ||
            zomeDef.content.name === 'profiles'}
                  .disabled=${zomeDef.content.name === 'blocky' ||
            zomeDef.content.name === 'profiles'}
                >
                  ${zomeDef.content.name}
                </mwc-check-list-item>
              `)}
          </mwc-list>

          <div class="column">
            <mwc-textfield
              @input=${(e) => (this._templateName = e.target.value)}
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
            },
            'mwc-card': Card,
            'mwc-snackbar': Snackbar,
        };
    }
}
__decorate([
    property()
], ComposeZomes.prototype, "zomeDefs", void 0);
__decorate([
    query('#install-dna-dialog')
], ComposeZomes.prototype, "_installDnaDialog", void 0);
__decorate([
    property()
], ComposeZomes.prototype, "_templateName", void 0);
//# sourceMappingURL=compose-zomes.js.map