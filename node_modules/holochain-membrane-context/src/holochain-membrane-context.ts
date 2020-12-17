import { css, html, LitElement, property } from 'lit-element';
import { withContext } from 'wc-context';
import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';

export class HolochainMembraneContext extends withContext(LitElement) {
  static get providedContexts() {
    return {
      membrane: {
        cellId: null,
        appWebsocket: null,
        adminWebsocket: null,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateProvidedContext('membrane', {
      cellId: this.cellId,
      appWebsocket: this.appWebsocket,
      adminWebsocket: this.adminWebsocket,
    });
  }

  @property({ type: Array })
  cellId!: CellId;
  @property({ type: Object })
  appWebsocket!: AppWebsocket;
  @property({ type: Object })
  adminWebsocket!: AdminWebsocket;

  updated() {
    super.updated();
    this.updateProvidedContext('membrane', {
      cellId: this.cellId,
      appWebsocket: this.appWebsocket,
      adminWebsocket: this.adminWebsocket,
    });
  }

  static get styles() {
    return css`
      :host {
        display: contents;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
