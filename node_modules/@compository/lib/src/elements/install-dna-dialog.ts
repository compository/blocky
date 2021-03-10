import { html, LitElement, property, query } from 'lit-element';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Button } from 'scoped-material-components/mwc-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { AdminWebsocket, DnaBundle } from '@holochain/conductor-api';
import { sharedStyles } from './sharedStyles';
import { BaseCompositoryService } from './base';

export abstract class InstallDnaDialog extends BaseCompositoryService {
  @property({ type: Object })
  dnaBundle!: DnaBundle;

  @query('#dialog')
  _dialog!: Dialog;

  @property({ type: String })
  _dnaPath!: string;

  open(opened = true) {
    this._dialog.open = opened;
  }

  async installDna() {
    const adminWs = this._compositoryService.adminWebsocket as AdminWebsocket;
    const agentKey = await adminWs.generateAgentPubKey();
    const installed_app_id = `generated-app-${Date.now() % 1000}`;

    const dnaHash = await adminWs.registerDna({
      bundle: this.dnaBundle,
    });

    const result = await adminWs.installApp({
      agent_key: agentKey,
      dnas: [
        {
          hash: dnaHash,
          nick: installed_app_id,
        },
      ],
      installed_app_id,
    });
    await adminWs.activateApp({ installed_app_id });

    const cellId = Object.values(result.slots)[0].base_cell_id;

    this.dispatchEvent(
      new CustomEvent('dna-installed', {
        detail: { cellId },
        bubbles: true,
        composed: true,
      })
    );
    this.open(false);
  }

  render() {
    return html`
      <mwc-dialog id="dialog" heading="Install new DNA">
        ${this.dnaBundle
          ? html`
              <div class="column">
                <span>Name: ${this.dnaBundle.manifest.name}</span>
                <span style="margin-top: 8px;"
                  >Are you sure you want to install this DNA?</span
                >
              </div>
            `
          : html`
              <mwc-textfield
                id="dna-path"
                placeholder="Dna.gz path"
                required
                @input=${(e: any) => (this._dnaPath = e.target.value)}
              >
              </mwc-textfield>
            `}

        <mwc-button
          slot="primaryAction"
          .disabled=${!this._dnaPath && !this.dnaBundle}
          @click=${() => this.installDna()}
        >
          Install
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static get scopedElements() {
    return {
      'mwc-dialog': Dialog,
      'mwc-button': Button,
      'mwc-textfield': TextField,
    };
  }

  static get styles() {
    return sharedStyles;
  }
}
