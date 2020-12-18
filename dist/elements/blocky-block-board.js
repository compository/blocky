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
        this._blockSets = undefined;
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
        this._blockSets = zomeRenderers
            .filter(([def, renderers]) => renderers !== undefined)
            .map(([def, renderers]) => ({
            name: def.name,
            blocks: renderers === null || renderers === void 0 ? void 0 : renderers.standalone,
        }));
        const layouts = await this.blockyService.getAllBoardLayouts();
        this._blockLayout = layouts[0];
        setTimeout(() => (this.board.editing = !this._blockLayout));
    }
    async createBoard(layout) {
        this._blockLayout = layout;
        this.board.editing = false;
        return this.blockyService.createBoardLayout(layout);
    }
    render() {
        if (this._blockSets === undefined)
            return html `<mwc-circular-progress></mwc-circular-progress>`;
        return html `<block-board
        id="board"
        style="flex: 1;"
        .blockSets=${this._blockSets}
        .blockLayout=${this._blockLayout}
        @board-saved=${(e) => this.createBoard(e.detail.blockLayout)}
      ></block-board>

      ${this.board && !this.board.editing
            ? html `
            <mwc-fab
              label="edit"
              class="fab"
              @click=${() => (this.board.editing = true)}
              icon="edit"
            >
            </mwc-fab>
          `
            : html ``} `;
    }
}
__decorate([
    property()
], BlockyBlockBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blockSets", void 0);
__decorate([
    property({ type: Array })
], BlockyBlockBoard.prototype, "_blockLayout", void 0);
//# sourceMappingURL=blocky-block-board.js.map