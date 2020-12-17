import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor, LitElement, property } from 'lit-element';
import { withContext } from 'wc-context';

export interface MembraneContext {
  cellId: CellId;
  appWebsocket: AppWebsocket;
  adminWebsocket: AdminWebsocket;
}

const membraneContextRaw = <T extends Constructor<HTMLElement>>(
  baseClass: T
): T & Constructor<{ context: { membrane: MembraneContext } }> =>
  (class extends withContext(baseClass) {
    static get observedContexts() {
      return ['membrane'];
    }
  } as unknown) as T & Constructor<{ context: { membrane: MembraneContext } }>;

export const membraneContext = <T extends Constructor<LitElement>>(
  baseClass: T
): T &
  Constructor<{
    context: { membrane: MembraneContext };
    cellId: CellId;
    appWebsocket: AppWebsocket;
    adminWebsocket: AdminWebsocket;
  }> => {
  class MembraneContextElement extends membraneContextRaw(baseClass) {
    private _cellId!: CellId;

    set cellId(value: CellId) {
      this.requestUpdate('cellId', this._cellId);
      this._cellId = value;
    }

    get cellId() {
      return this._cellId ? this._cellId : this.context.membrane.cellId;
    }

    private _appWebsocket!: AppWebsocket;
    set appWebsocket(value: AppWebsocket) {
      this.requestUpdate('appWebsocket', this._appWebsocket);
      this._appWebsocket = value;
    }

    get appWebsocket() {
      return this._appWebsocket
        ? this._appWebsocket
        : this.context.membrane.appWebsocket;
    }

    private _adminWebsocket!: AdminWebsocket;
    set adminWebsocket(value: AdminWebsocket) {
      this.requestUpdate('adminWebsocket', this._adminWebsocket);
      this._adminWebsocket = value;
    }

    get adminWebsocket() {
      return this._adminWebsocket
        ? this._adminWebsocket
        : this.context.membrane.adminWebsocket;
    }
  }
  return MembraneContextElement;
};
