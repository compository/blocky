import { __decorate } from "tslib";
import { LitElement, html, property, css, } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { BlockBoardSlot } from "./block-board-slot";
import { sharedStyles } from "./sharedStyles";
export class BlockBoardLayoutRenderer extends Scoped(LitElement) {
    static get scopedElements() {
        return {
            "block-board-slot": BlockBoardSlot,
        };
    }
    renderSlot(slot) {
        if (typeof slot === "string") {
            const block = this.availableBlocks.find((block) => block.name === slot);
            if (!block)
                throw new Error(`Tried to render an unexisting block`);
            return html `<block-board-slot .block=${block}></block-board-slot>`;
        }
        else if (slot) {
            return this.renderLayout(slot);
        }
        else {
            return html ``;
        }
    }
    renderLayout(blockLayout) {
        return html `
      <div
        class=${classMap({
            row: blockLayout.direction === "horizontal",
            column: blockLayout.direction === "vertical",
        })}
        style="flex: 1;"
      >
        <div
          style=${styleMap({
            flex: blockLayout.firstSlotRelativeSize * 100 + "%",
            display: "flex",
        })}
        >
          ${this.renderSlot(blockLayout.slots[0])}
        </div>
        <div
          style=${styleMap({
            flex: (1 - blockLayout.firstSlotRelativeSize) * 100 + "%",
        })}
        >
          ${this.renderSlot(blockLayout.slots[1])}
        </div>
      </div>
    `;
    }
    render() {
        return this.renderSlot(this.blockLayout);
    }
}
BlockBoardLayoutRenderer.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    property({ type: Array })
], BlockBoardLayoutRenderer.prototype, "availableBlocks", void 0);
__decorate([
    property({ type: Object })
], BlockBoardLayoutRenderer.prototype, "blockLayout", void 0);
//# sourceMappingURL=block-board-layout-renderer.js.map