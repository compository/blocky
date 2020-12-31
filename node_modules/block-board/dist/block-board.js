import { __decorate } from "tslib";
import { html, css, LitElement, property } from "lit-element";
import { sharedStyles } from "./sharedStyles";
import { BlockBoardLayoutEditor } from "./block-board-layout-editor";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { BlockBoardLayoutRenderer } from "./block-board-layout-renderer";
import { BlockBoardBlockSelector } from "./block-board-block-selector";
import { Drawer } from "scoped-material-components/mwc-drawer";
export class BlockBoard extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.editing = true;
        this._blockSets = [];
        this.initialBlockLayout = undefined;
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
    connectedCallback() {
        super.connectedCallback();
        this._blockLayout = this.initialBlockLayout;
    }
    internalIsLayoutEmpty(blockNode) {
        if (!blockNode)
            return true;
        else if (blockNode.direction)
            return (this.internalIsLayoutEmpty(blockNode.slots[0]) &&
                this.internalIsLayoutEmpty(blockNode.slots[1]));
        return false;
    }
    isEditingLayoutEmpty() {
        if (!this.editor)
            return false;
        return this.internalIsLayoutEmpty(this.editor.blockLayout);
    }
    get editor() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("layout-editor");
    }
    save() {
        this._blockLayout = this.editor.blockLayout;
        this.editing = false;
        this.dispatchEvent(new CustomEvent("board-saved", {
            detail: { blockLayout: this._blockLayout },
            composed: true,
            bubbles: true,
        }));
        return this._blockLayout;
    }
    renderLayout() {
        return html `
      <block-board-layout-renderer
        style="flex: 1;"
        .blockLayout=${this._blockLayout}
        .availableBlocks=${this.availableBlocks}
      ></block-board-layout-renderer>
    `;
    }
    renderEditingMode() {
        return html `
      <mwc-drawer style="flex: 1;" hasHeader>
        <span slot="title"> Draggable blocks </span>

        <div class="column" style="margin: 0 16px;">
          <div class="row" style="justify-content: flex-end;"></div>
          <block-board-block-selector
            .blockSets=${this.blockSets}
          ></block-board-block-selector>
        </div>

        <div slot="appContent" class="column" style="height: 100%;">
          <block-board-layout-editor
            id="layout-editor"
            style="flex: 1;"
            class="column"
            .blockLayout=${this._blockLayout}
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
    static get scopedElements() {
        return {
            "mwc-drawer": Drawer,
            "block-board-layout-renderer": BlockBoardLayoutRenderer,
            "block-board-layout-editor": BlockBoardLayoutEditor,
            "block-board-block-selector": BlockBoardBlockSelector,
        };
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
], BlockBoard.prototype, "_blockLayout", void 0);
//# sourceMappingURL=block-board.js.map