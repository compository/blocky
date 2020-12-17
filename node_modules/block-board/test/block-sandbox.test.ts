import { html, fixture, expect } from "@open-wc/testing";

import { Blockboard } from "../src/block-board";

describe("Blockboard", () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: Blockboard = await fixture(html`
      <block-board></block-board>
    `);

    expect(el.title).to.equal("Hey there");
  });

  it("increases the counter on button click", async () => {
    const el: Blockboard = await fixture(html`
      <block-board></block-board>
    `);
    el.shadowRoot!.querySelector("button")!.click();

  });

  it("can override the title via attribute", async () => {
    const el: Blockboard = await fixture(html`
      <block-board title="attribute title"></block-board>
    `);

    expect(el.title).to.equal("attribute title");
  });

  it("passes the a11y audit", async () => {
    const el: Blockboard = await fixture(html`
      <block-board></block-board>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
