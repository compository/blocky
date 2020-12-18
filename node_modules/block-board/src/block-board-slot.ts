import { html, LitElement, property, query } from "lit-element";
import { Scoped } from "scoped-elements";
import { Block } from "./types";

export class BlockBoardSlot extends Scoped(LitElement) {
  @property({ type: Object })
  block!: Block;

  @query("#slot")
  _slot!: HTMLElement;

  firstUpdated() {
    // If we have included the scoped-registries polyfill, we'll have the CustomElementRegistry on our shadow root
    const scopedRegistry = ((this.shadowRoot as any) as {
      customElements: CustomElementRegistry;
    }).customElements;
    // Otherwise we just use the global one
    const registry = scopedRegistry ? scopedRegistry : window.customElements;
    this.block.render(this.shadowRoot as ShadowRoot, registry);
  }

  render() {
    return html``;
  }
}
