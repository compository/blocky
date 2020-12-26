import { __decorate } from "tslib";
import { css, html, LitElement, property, } from 'lit-element';
import { CompositoryService, fetchLensesForAllZomes } from '@compository/lib';
import { BlockBoard } from 'block-board';
import { membraneContext } from '@holochain-open-dev/membrane-context';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { BlockyService } from '../blocky.service';
export class BlockyBlockBoard extends membraneContext(Scoped(LitElement)) {
    constructor() {
        super(...arguments);
        this.editing = false;
        this._blockSets = undefined;
        this._blockLayout = undefined;
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
    get blockyService() {
        return new BlockyService(this.membraneContext.appWebsocket, this.membraneContext.cellId);
    }
    get board() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('board');
    }
    updated(changedValues) {
        super.updated(changedValues);
        if (changedValues.has('membraneContext') &&
            this.membraneContext.appWebsocket) {
            this.loadRenderers();
        }
    }
    async loadRenderers() {
        // Get the renderers for each of the zomes
        const zomeLenses = await fetchLensesForAllZomes(new CompositoryService(this.membraneContext.appWebsocket, this.compositoryCellId), this.membraneContext.cellId);
        this._blockSets = zomeLenses
            .filter(([def, lenses]) => lenses !== undefined)
            .map(([def, lenses]) => ({
            name: def.name,
            blocks: lenses === null || lenses === void 0 ? void 0 : lenses.standalone.map(s => ({
                name: s.name,
                render: (root) => s.render(root, this.membraneContext.appWebsocket, this.membraneContext.cellId),
            })),
        }));
        const layouts = await this.blockyService.getAllBoardLayouts();
        this._blockLayout = layouts[0];
        this.editing = !this._blockLayout;
    }
    async createBoard(layout) {
        this.editing = false;
        this.requestUpdate();
        if (JSON.stringify(this._blockLayout) !== JSON.stringify(layout)) {
            this._blockLayout = layout;
            await this.blockyService.createBoardLayout(layout);
        }
    }
    render() {
        if (this._blockSets === undefined)
            return html `<mwc-circular-progress></mwc-circular-progress>`;
        return html `<block-board
      id="board"
      style="flex: 1;"
      .editing=${this.editing}
      .blockSets=${this._blockSets}
      .blockLayout=${this._blockLayout}
      @board-saved=${(e) => this.createBoard(e.detail.blockLayout)}
    ></block-board> `;
    }
}
__decorate([
    property()
], BlockyBlockBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Boolean })
], BlockyBlockBoard.prototype, "editing", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blockSets", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blockLayout", void 0);
//# sourceMappingURL=blocky-block-board.js.map