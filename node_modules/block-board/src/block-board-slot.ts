import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { Block } from "./types";

export class BlockBoardSlot extends LitElement {
  @property({ type: Object })
  block!: Block;

  @query("#slot")
  _slot!: HTMLElement;

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);
    if (changedValues.has("block")) {
      this.block.render(this.shadowRoot as ShadowRoot);
    }
  }

  render() {
    return html``;
  }
}
