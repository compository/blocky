import { __decorate } from "tslib";
import { html, LitElement, property, query } from 'lit-element';
import { discoverEntryDetails } from '../processes/discover';
import { fetchRenderersForZome } from '../processes/fetch-renderers';
import { membraneContext } from 'holochain-membrane-context';
import { CompositoryService } from '../services/compository-service';
export class CompositoryDiscoverEntry extends membraneContext(LitElement) {
    constructor() {
        super(...arguments);
        this._loading = true;
    }
    async firstUpdated() {
        const compositoryService = new CompositoryService(this.appWebsocket, this.cellId);
        const { cellId, zomeIndex, entryDefIndex, entryHash, } = await discoverEntryDetails(this.adminWebsocket, compositoryService, this.entryUri);
        const { renderers, def } = await fetchRenderersForZome(compositoryService, cellId, zomeIndex);
        const entryIdStr = def.entry_defs[entryDefIndex];
        renderers.entryRenderers[entryIdStr].render(this._scope.shadowRoot, this._scope.shadowRoot.customElements, entryHash);
        this._loading = false;
    }
    render() {
        return html `${this._loading
            ? html `<mwc-circular-progress></mwc-circular-progress>`
            : html ``}
      <compository-scope id="scope"> </compository-scope> `;
    }
}
__decorate([
    property({ type: String })
], CompositoryDiscoverEntry.prototype, "entryUri", void 0);
__decorate([
    property({ type: Boolean })
], CompositoryDiscoverEntry.prototype, "_loading", void 0);
__decorate([
    query('#scope')
], CompositoryDiscoverEntry.prototype, "_scope", void 0);
//# sourceMappingURL=compository-discover-entry.js.map