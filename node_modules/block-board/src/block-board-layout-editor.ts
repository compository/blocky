import {
  LitElement,
  html,
  property,
  TemplateResult,
  Constructor,
} from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";

import { Block, BlockLayoutNode, BlockSlot } from "./types";
import { sharedStyles } from "./sharedStyles";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { IconButton } from "scoped-material-components/mwc-icon-button";
import { CircularProgress } from "scoped-material-components/mwc-circular-progress";
import { BlockBoardSlot } from "./block-board-slot";

export class BlockBoardLayoutEditor extends (Scoped(
  LitElement
) as Constructor<LitElement>) {
  static styles = sharedStyles;

  @property({ type: Array }) private availableBlocks: Array<Block> = [];
  @property({ type: Object }) blockLayout!: BlockSlot;

  static get scopedElements() {
    return {
      "block-board-slot": BlockBoardSlot,
      "vaadin-split-layout": SplitLayoutElement,
      "mwc-icon-button": IconButton,
    };
  }

  renderBlockSlot(
    blockName: string | undefined,
    parent?: {
      node: BlockLayoutNode;
      slotIndex: number;
    },
    grandparent?: {
      node: BlockLayoutNode;
      slotIndex: number;
    }
  ) {
    return html`
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
              } else {
                this.blockLayout = {
                  direction: "vertical",
                  firstSlotRelativeSize: 0.5,
                  slots: [blockName, undefined],
                };
              }
              this.requestUpdate();
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
              } else {
                this.blockLayout = {
                  direction: "horizontal",
                  firstSlotRelativeSize: 0.5,
                  slots: [blockName, undefined],
                };
              }

              this.requestUpdate();
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
                } else {
                  this.blockLayout = blockName;
                }
              }

              this.requestUpdate();
            }}
            icon="delete"
          ></mwc-icon-button>
        </div>
        <div
          style="background-color: rgba(0, 0, 0, 0.1); flex: 1;"
          @drop=${(e: DragEvent) => {
            const blockName = e.dataTransfer?.getData("blockName");

            if (parent) {
              parent.node.slots[parent.slotIndex] = blockName;
            } else {
              this.blockLayout = blockName;
            }
            this.requestUpdate();
          }}
          @dragover=${(e: DragEvent) => e.preventDefault()}
        >
          ${blockName && this.findBlock(blockName)
            ? html`<block-board-slot
                style="pointer-events: none;"
                .block=${this.findBlock(blockName) as Block}
              ></block-board-slot>`
            : html``}
        </div>
      </div>
    `;
  }

  findBlock(blockName: string): Block | undefined {
    return this.availableBlocks.find((b) => b.name === blockName);
  }

  renderLayoutNode(
    blockLayout: BlockLayoutNode,
    parentNode?: {
      node: BlockLayoutNode;
      slotIndex: number;
    }
  ): TemplateResult {
    return html`
      <vaadin-split-layout
        .orientation=${blockLayout.direction}
        style="flex: 1;"
        @splitter-dragend=${(e: any) => {
          const getPxSize = (slotElement: any) =>
            parseInt(
              slotElement
                .assignedNodes()[0]
                .style.flex.split(" ")[2]
                .split("px")[0]
            );
          const primaryPxSize = getPxSize(e.path[0].$.primary);
          const secondaryPxSize = getPxSize(e.path[0].$.secondary);

          blockLayout.firstSlotRelativeSize =
            primaryPxSize / (primaryPxSize + secondaryPxSize);
        }}
      >
        ${blockLayout.slots.map((slot, index) => {
          if (!slot || typeof slot === "string")
            return this.renderBlockSlot(
              slot,
              { node: blockLayout, slotIndex: index },
              parentNode
            );
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
      return this.renderBlockSlot(
        this.blockLayout as string | undefined,
        undefined,
        undefined
      );
    else
      return this.renderLayoutNode(
        this.blockLayout as BlockLayoutNode,
        undefined
      );
  }
}
