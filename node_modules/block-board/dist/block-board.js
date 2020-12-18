import { __decorate } from "tslib";
import { html, css, LitElement, property } from "lit-element";
import "./block-board-block-selector";
import "./block-board-layout-editor";
import "./block-board-layout-renderer";
import { sharedStyles } from "./sharedStyles";
import { BlockBoardLayoutEditor } from "./block-board-layout-editor";
import { Scoped } from "scoped-elements";
import { BlockBoardLayoutRenderer } from "./block-board-layout-renderer";
import { BlockBoardBlockSelector } from "./block-board-block-selector";
import { Drawer } from "scoped-material-components/dist/mwc-drawer";
import { IconButton } from "scoped-material-components/dist/mwc-icon-button";
export class BlockBoard extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.editing = true;
        this._availableBlocks = [];
        this.blockLayout = undefined;
    }
    set availableBlocks(blocks) {
        this._availableBlocks = [...blocks];
    }
    get availableBlocks() {
        return this._availableBlocks;
    }
    static get scopedElements() {
        return {
            "mwc-drawer": Drawer,
            "mwc-icon-button": IconButton,
            "block-board-layout-renderer": BlockBoardLayoutRenderer,
            "block-board-layout-editor": BlockBoardLayoutEditor,
            "block-board-block-selector": BlockBoardBlockSelector,
        };
    }
    saveLayout() {
        var _a;
        const editor = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("layout-editor");
        this.blockLayout = editor.blockLayout;
        this.editing = false;
        this.dispatchEvent(new CustomEvent("board-saved", {
            detail: { blockLayout: this.blockLayout },
        }));
    }
    renderLayout() {
        return html `
      <block-board-layout-renderer
        style="flex: 1;"
        .blockLayout=${this.blockLayout}
        .availableBlocks=${this.availableBlocks}
      ></block-board-layout-renderer>
    `;
    }
    renderEditingMode() {
        return html `
      <mwc-drawer style="flex: 1;">
        <div class="column">
          <div class="row" style="justify-content: flex-end;">
            <mwc-icon-button
              icon="save"
              @click=${this.saveLayout}
            ></mwc-icon-button>
          </div>
          <block-board-block-selector
            .availableBlocks=${this.availableBlocks}
          ></block-board-block-selector>
        </div>

        <div slot="appContent" class="column" style="height: 100%;">
          <block-board-layout-editor
            id="layout-editor"
            style="flex: 1;"
            class="column"
            .blockLayout=${this.blockLayout}
            .availableBlocks=${this.availableBlocks}
          ></block-board-layout-editor>
        </div>
      </mwc-drawer>
    `;
    }
    render() {
        if (this.editing)
            return this.renderEditingMode();
        else
            return this.renderLayout();
    }
}
BlockBoard.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    property({ type: Boolean })
], BlockBoard.prototype, "editing", void 0);
__decorate([
    property({ type: Array })
], BlockBoard.prototype, "_availableBlocks", void 0);
__decorate([
    property({ type: Array })
], BlockBoard.prototype, "blockLayout", void 0);
//# sourceMappingURL=block-board.js.map