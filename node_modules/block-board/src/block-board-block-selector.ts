import { LitElement, html, property, Constructor } from "lit-element";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { ListItem } from "scoped-material-components/mwc-list-item";
import { List } from "scoped-material-components/mwc-list";
import { Block, BlockSet } from "./types";
import { sharedStyles } from "./sharedStyles";

export class BlockBoardBlockSelector extends (Scoped(
  LitElement
) as Constructor<LitElement>) {
  static styles = sharedStyles;

  @property({ type: Array }) blockSets: Array<BlockSet> = [];

  onDragStart(e: DragEvent, block: Block) {
    e.dataTransfer?.setData("blockName", block.name);
  }

  renderBlockSet(set: BlockSet) {
    return html`
      <div class="column" style="margin: 8px;">
        <span style="font-weight: bold;">${set.name}</span>
        <mwc-list class="column">
          ${set.blocks.map(
            (block) =>
              html` <mwc-list-item
                draggable="true"
                @dragstart=${(e: DragEvent) => this.onDragStart(e, block)}
                >${block.name}
              </mwc-list-item>`
          )}
        </mwc-list>
      </div>
    `;
  }

  render() {
    return html`
      <div class="column">
        ${this.blockSets.map((set) => this.renderBlockSet(set))}
      </div>
    `;
  }

  static get scopedElements() {
    return {
      "mwc-list": List,
      "mwc-list-item": ListItem,
    };
  }
}
