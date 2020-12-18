import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import { CompositoryService, fetchRenderersForAllZomes, } from 'compository';
import { BlockBoard } from 'block-board';
import { membraneContext } from 'holochain-membrane-context';
import { Scoped } from 'scoped-elements';
import { CircularProgress } from 'scoped-material-components/dist/mwc-circular-progress';
import { Fab } from 'scoped-material-components/dist/mwc-fab';
import { BlockyService } from '../blocky.service';
export class BlockyBlockBoard extends membraneContext(Scoped(LitElement)) {
    constructor() {
        super(...arguments);
        this._blocks = undefined;
        this._blockLayout = undefined;
    }
    static get scopedElements() {
        return {
            'block-board': BlockBoard,
            'mwc-circular-progress': CircularProgress,
            'mwc-fab': Fab,
        };
    }
    static get styles() {
        return css `
      :host {
        display: flex;
      }
      .fab {
        position: fixed;
        right: 40px;
        bottom: 40px;
      }
    `;
    }
    get blockyService() {
        return new BlockyService(this.appWebsocket, this.cellId);
    }
    get board() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('board');
    }
    async firstUpdated() {
        // Get the renderers for each of the zomes
        const zomeRenderers = await fetchRenderersForAllZomes(new CompositoryService(this.appWebsocket, this.compositoryCellId), this.cellId);
        const standaloneRenderers = zomeRenderers.map(r => r.renderers.standalone);
        const flattened = [].concat(...standaloneRenderers);
        this._blocks = flattened;
        const layouts = await this.blockyService.getAllBoardLayouts();
        this._blockLayout = layouts[0];
    }
    async createBoard(layout) {
        this._blockLayout = layout;
        return this.blockyService.createBoardLayout(layout);
    }
    render() {
        var _a;
        if (this._blocks === undefined)
            return html `<mwc-circular-progress></mwc-circular-progress>`;
        return html `<block-board
        id="board"
        style="flex: 1;"
        .availableBlocks=${this._blocks}
        .blockLayout=${this._blockLayout}
        @board-saved=${(e) => this.createBoard(e.detail.blockLayout)}
      ></block-board>
      
      ${((_a = this.board) === null || _a === void 0 ? void 0 : _a.editing) ? html ``
            : html `
            <mwc-fab label="edit" class="fab">
              <mwc-icon-button
                slot="icon"
                @click=${() => (this.board.editing = true)}
                >edit</mwc-icon-button
              >
            </mwc-fab>
          `} `;
    }
}
__decorate([
    property()
], BlockyBlockBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blocks", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blockLayout", void 0);
//# sourceMappingURL=blocky-block-board.js.map