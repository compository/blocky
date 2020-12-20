import { css, html, LitElement, property, PropertyValues } from 'lit-element';
import { ProviderMixin } from 'lit-element-context';
import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { MembraneContext } from './with-membrane-context';

export class MembraneContextProvider extends ProviderMixin(LitElement) {
  static get provide() {
    return ['membraneContext'];
  }

  @property({ type: Object })
  membraneContext: MembraneContext = {
    adminWebsocket: undefined,
    appWebsocket: undefined as any,
    cellId: undefined as any,
  };

  @property({ type: Array })
  cellId!: CellId;
  @property({ type: Object })
  appWebsocket!: AppWebsocket;
  @property({ type: Object })
  adminWebsocket!: AdminWebsocket;

  updated(changedValues: PropertyValues) {
    super.updated();
    if (
      !(
        changedValues.size === 1 &&
        changedValues.has('membraneContext')
      )
    ) {
      this.membraneContext = {
        cellId: this.cellId,
        appWebsocket: this.appWebsocket,
        adminWebsocket: this.adminWebsocket,
      };
    }
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
