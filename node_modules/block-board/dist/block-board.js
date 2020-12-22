import { __decorate } from "tslib";
import { html, css, LitElement, property } from "lit-element";
import { sharedStyles } from "./sharedStyles";
import { BlockBoardLayoutEditor } from "./block-board-layout-editor";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { BlockBoardLayoutRenderer } from "./block-board-layout-renderer";
import { BlockBoardBlockSelector } from "./block-board-block-selector";
import { Drawer } from "scoped-material-components/mwc-drawer";
import { IconButton } from "scoped-material-components/mwc-icon-button";
export class BlockBoard extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.editing = true;
        this._blockSets = [];
        this.blockLayout = {
            direction: "horizontal",
            slots: [undefined, undefined],
            firstSlotRelativeSize: 0.5,
        };
    }
    set blockSets(blocks) {
        this._blockSets = [...blocks];
    }
    get blockSets() {
        return this._blockSets;
    }
    get availableBlocks() {
        const allBlocks = this._blockSets.map((set) => set.blocks);
        return [].concat(...allBlocks);
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
            .blockSets=${this.blockSets}
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
], BlockBoard.prototype, "_blockSets", void 0);
__decorate([
    property({ type: Array })
], BlockBoard.prototype, "blockLayout", void 0);
//# sourceMappingURL=block-board.js.map