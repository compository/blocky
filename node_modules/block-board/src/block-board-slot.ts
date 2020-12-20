import { html, LitElement, property, query } from "lit-element";
import { Block } from "./types";

export class BlockBoardSlot extends LitElement {
  @property({ type: Object })
  block!: Block;

  @query("#slot")
  _slot!: HTMLElement;

  firstUpdated() {
    this.block.render(this.shadowRoot as ShadowRoot);
  }

  render() {
    return html``;
  }
}
