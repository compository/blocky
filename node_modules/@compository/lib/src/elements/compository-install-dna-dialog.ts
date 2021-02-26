import { Constructor, html, LitElement, property, query } from 'lit-element';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Button } from 'scoped-material-components/mwc-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { membraneContext } from '@holochain-open-dev/membrane-context';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { AdminWebsocket, DnaFile } from '@holochain/conductor-api';
import { sharedStyles } from './sharedStyles';
import { serializeHash } from '@holochain-open-dev/core-types';

export class CompositoryInstallDnaDialog extends membraneContext(
  Scoped(LitElement) as Constructor<LitElement>
) {
  @property({ type: Object })
  dnaFile!: DnaFile;

  @query('#dialog')
  _dialog!: Dialog;

  @property({ type: String })
  _dnaPath!: string;

  open(opened = true) {
    this._dialog.open = opened;
  }

  async installDna() {
    const adminWs = this.membraneContext.adminWebsocket as AdminWebsocket;
    const agentKey = await adminWs.generateAgentPubKey();
    const installed_app_id = `generated-app-${Date.now() % 1000}`;

    const dnaHash = await adminWs.registerDna({
      source: { dna_file: this.dnaFile },
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

    this.dispatchEvent(
      new CustomEvent('dna-installed', {
        detail: { cellId: result.cell_data[0][0] },
        bubbles: true,
        composed: true,
      })
    );
    this.open(false);
  }

  render() {
    return html`
      <mwc-dialog id="dialog" heading="Install new DNA">
        ${this.dnaFile
          ? html`
              <div class="column">
                <span>Name: ${this.dnaFile.dna.content.name}</span>
                <span
                  >Hash:
                  ${serializeHash(new Uint8Array(this.dnaFile.dna.hash))}</span
                >
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
          .disabled=${!this._dnaPath && !this.dnaFile}
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
