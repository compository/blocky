import { LitElement, html, property } from "lit-element";
import { Block, BlockSet } from "./block";
import { sharedStyles } from "./sharedStyles";

export class BlockBoardBlockSelector extends LitElement {
  static styles = sharedStyles;

  @property({ type: Array }) blockSets: Array<BlockSet> = [];

  onDragStart(e: DragEvent, block: Block) {
    e.dataTransfer?.setData("blockName", block.name);
  }

  renderBlockSet(set: BlockSet) {
    return html`
      <div class="column" style="margin: 8px;">
        <span style="margin-bottom: 4px; font-weight: bold;">${set.name}</span>
        <div class="column" style="margin: 8px;">
          ${set.blocks.map(
            (block) =>
              html`<span
                style="margin-bottom: 2px;"
                draggable="true"
                @dragstart=${(e: DragEvent) => this.onDragStart(e, block)}
                >${block.name}
              </span>`
          )}
        </div>
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
}
