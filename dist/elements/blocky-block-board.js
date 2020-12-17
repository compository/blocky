import { __decorate } from "tslib";
import { html, LitElement, property } from 'lit-element';
import { CompositoryService, fetchRenderersForAllZomes, } from 'compository';
import { BlockBoard } from 'block-board';
import { membraneContext } from 'holochain-membrane-context';
import { Scoped } from 'scoped-elements';
import { CircularProgress } from '@material/mwc-circular-progress';
export class BlockBlockBoard extends membraneContext(Scoped(LitElement)) {
    constructor() {
        super(...arguments);
        this._blocks = undefined;
    }
    static get scopedElements() {
        return {
            'block-board': BlockBoard,
            'mwc-circular-progress': CircularProgress,
        };
    }
    async firstUpdated() {
        // Get the renderers for each of the zomes
        const zomeRenderers = await fetchRenderersForAllZomes(new CompositoryService(this.appWebsocket, this.compositoryCellId), this.cellId);
        const standaloneRenderers = zomeRenderers.map(r => r.renderers.standalone);
        const flattened = [].concat(...standaloneRenderers);
        this._blocks = flattened;
    }
    render() {
        if (this._blocks === undefined)
            return html `<mwc-circular-progress></mwc-circular-progress>`;
        return html `<block-board .availableBlocks=${this._blocks}></block-board>`;
    }
}
__decorate([
    property()
], BlockBlockBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Array })
], BlockBlockBoard.prototype, "_blocks", void 0);
//# sourceMappingURL=blocky-block-board.js.map