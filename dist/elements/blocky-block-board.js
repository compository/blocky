import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import { CompositoryService, fetchRenderersForAllZomes, } from 'compository';
import { BlockBoard } from 'block-board';
import { membraneContext } from 'holochain-membrane-context';
import { Scoped } from 'scoped-elements';
import { CircularProgress } from 'scoped-material-components/dist/mwc-circular-progress';
export class BlockyBlockBoard extends membraneContext(Scoped(LitElement)) {
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
    static get styles() {
        return css `
      :host {
        display: flex;
      }
    `;
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
        return html `<block-board
      style="flex: 1;"
      .availableBlocks=${this._blocks}
    ></block-board>`;
    }
}
__decorate([
    property()
], BlockyBlockBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blocks", void 0);
//# sourceMappingURL=blocky-block-board.js.map