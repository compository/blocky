import { __decorate } from "tslib";
import { html, LitElement, property, query } from 'lit-element';
import { discoverEntryDetails } from '../processes/discover';
import { fetchLensesForZome } from '../processes/fetch-lenses';
import { membraneContext } from '@holochain-open-dev/membrane-context';
import { CompositoryService } from '../services/compository-service';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
export class CompositoryDiscoverEntry extends membraneContext(Scoped(LitElement)) {
    constructor() {
        super(...arguments);
        this._loading = true;
    }
    static get scopedElements() {
        return {
            'mwc-circular-progress': CircularProgress,
        };
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has('membraneContext') && this.membraneContext.appWebsocket) {
            this.loadRenderers();
        }
    }
    async loadRenderers() {
        const compositoryService = new CompositoryService(this.membraneContext.appWebsocket, this.membraneContext.cellId);
        const { cellId, zomeIndex, entryDefIndex, entryHash, } = await discoverEntryDetails(this.membraneContext.adminWebsocket, compositoryService, this.entryUri);
        const [def, renderers] = await fetchLensesForZome(compositoryService, cellId, zomeIndex);
        if (renderers) {
            const entryIdStr = def.entry_defs[entryDefIndex];
            renderers.entryLenses[entryIdStr].render(this._scope.shadowRoot, this.membraneContext.appWebsocket, cellId, entryHash);
        }
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