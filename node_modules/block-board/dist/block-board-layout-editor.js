import { __decorate } from "tslib";
import { LitElement, html, property, } from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { sharedStyles } from "./sharedStyles";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { IconButton } from "scoped-material-components/mwc-icon-button";
import { BlockBoardSlot } from "./block-board-slot";
export class BlockBoardLayoutEditor extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.availableBlocks = [];
    }
    static get scopedElements() {
        return {
            "block-board-slot": BlockBoardSlot,
            "vaadin-split-layout": SplitLayoutElement,
            "mwc-icon-button": IconButton,
        };
    }
    renderBlockNode(blockName, parent, grandparent) {
        return html `
      <div class="column" style="flex: 1;">
        <div class="row" style="justify-content: flex-end;">
          <mwc-icon-button
            @click=${() => {
            if (parent) {
                parent.node.slots[parent.slotIndex] = {
                    direction: "vertical",
                    firstSlotRelativeSize: 0.5,
                    slots: [blockName, undefined],
                };
            }
            else {
                this.blockLayout = {
                    direction: "vertical",
                    firstSlotRelativeSize: 0.5,
                    slots: [blockName, undefined],
                };
            }
            this.updateLayout();
        }}
            icon="horizontal_split"
          ></mwc-icon-button>
          <mwc-icon-button
            @click=${() => {
            if (parent) {
                parent.node.slots[parent.slotIndex] = {
                    direction: "horizontal",
                    firstSlotRelativeSize: 0.5,
                    slots: [blockName, undefined],
                };
            }
            else {
                this.blockLayout = {
                    direction: "horizontal",
                    firstSlotRelativeSize: 0.5,
                    slots: [blockName, undefined],
                };
            }
            this.updateLayout();
        }}
            icon="vertical_split"
          ></mwc-icon-button>
          <mwc-icon-button
            .disabled=${!parent}
            @click=${() => {
            if (parent) {
                const otherIndex = parent.slotIndex === 0 ? 1 : 0;
                const blockName = parent.node.slots[otherIndex];
                if (grandparent) {
                    grandparent.node.slots[grandparent.slotIndex] = blockName;
                }
                else {
                    this.blockLayout = blockName;
                }
            }
            this.updateLayout();
        }}
            icon="delete"
          ></mwc-icon-button>
        </div>
        <div
          style="background-color: rgba(0, 0, 0, 0.1); flex: 1;"
          @drop=${(e) => {
            var _a;
            const blockName = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("blockName");
            if (parent) {
                parent.node.slots[parent.slotIndex] = blockName;
            }
            else {
                this.blockLayout = blockName;
            }
            this.updateLayout();
        }}
          @dragover=${(e) => e.preventDefault()}
        >
          ${blockName && this.findBlock(blockName)
            ? html `<block-board-slot
                style="pointer-events: none;"
                .block=${this.findBlock(blockName)}
              ></block-board-slot>`
            : html ``}
        </div>
      </div>
    `;
    }
    updateLayout() {
        this.dispatchEvent(new CustomEvent("layout-updated", {
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    findBlock(blockName) {
        return this.availableBlocks.find((b) => b.name === blockName);
    }
    renderLayoutNode(blockLayout, parentNode) {
        return html `
      <vaadin-split-layout
        .orientation=${blockLayout.direction}
        style="flex: 1;"
        @splitter-dragend=${(e) => {
            const getPxSize = (slotElement) => parseInt(slotElement
                .assignedNodes()[0]
                .style.flex.split(" ")[2]
                .split("px")[0]);
            const primaryPxSize = getPxSize(e.path[0].$.primary);
            const secondaryPxSize = getPxSize(e.path[0].$.secondary);
            blockLayout.firstSlotRelativeSize =
                primaryPxSize / (primaryPxSize + secondaryPxSize);
        }}
      >
        ${blockLayout.slots.map((slot, index) => {
            if (!slot || typeof slot === "string")
                return this.renderBlockNode(slot, { node: blockLayout, slotIndex: index }, parentNode);
            else
                return this.renderLayoutNode(slot, {
                    node: blockLayout,
                    slotIndex: index,
                });
        })}
      </vaadin-split-layout>
    `;
    }
    render() {
        if (!this.blockLayout || typeof this.blockLayout === "string")
            return this.renderBlockNode(this.blockLayout, undefined, undefined);
        else
            return this.renderLayoutNode(this.blockLayout, undefined);
    }
}
BlockBoardLayoutEditor.styles = sharedStyles;
__decorate([
    property({ type: Array })
], BlockBoardLayoutEditor.prototype, "availableBlocks", void 0);
__decorate([
    property({ type: Object })
], BlockBoardLayoutEditor.prototype, "blockLayout", void 0);
//# sourceMappingURL=block-board-layout-editor.js.map