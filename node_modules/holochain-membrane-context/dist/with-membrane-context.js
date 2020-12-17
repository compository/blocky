import { withContext } from 'wc-context';
const membraneContextRaw = (baseClass) => class extends withContext(baseClass) {
    static get observedContexts() {
        return ['membrane'];
    }
};
export const membraneContext = (baseClass) => {
    class MembraneContextElement extends membraneContextRaw(baseClass) {
        set cellId(value) {
            this.requestUpdate('cellId', this._cellId);
            this._cellId = value;
        }
        get cellId() {
            return this._cellId ? this._cellId : this.context.membrane.cellId;
        }
        set appWebsocket(value) {
            this.requestUpdate('appWebsocket', this._appWebsocket);
            this._appWebsocket = value;
        }
        get appWebsocket() {
            return this._appWebsocket
                ? this._appWebsocket
                : this.context.membrane.appWebsocket;
        }
        set adminWebsocket(value) {
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
//# sourceMappingURL=with-membrane-context.js.map