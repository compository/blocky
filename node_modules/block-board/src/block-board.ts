import { html, css, LitElement, property, Constructor } from "lit-element";
import { Block, BlockLayout, BlockSet, BlockNode } from "./types";
import { sharedStyles } from "./sharedStyles";
import { BlockBoardLayoutEditor } from "./block-board-layout-editor";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { BlockBoardLayoutRenderer } from "./block-board-layout-renderer";
import { BlockBoardBlockSelector } from "./block-board-block-selector";
import { Drawer } from "scoped-material-components/mwc-drawer";
import { IconButton } from "scoped-material-components/mwc-icon-button";

export class BlockBoard extends (Scoped(
  LitElement
) as Constructor<LitElement>) {
  @property({ type: Boolean }) public editing: boolean = true;

  @property({ type: Array })
  private _blockSets: Array<BlockSet> = [];
  
  set blockSets(blocks: BlockSet[]) {
    this._blockSets = [...blocks];
  }
  get blockSets() {
    return this._blockSets;
  }

  get availableBlocks() {
    const allBlocks = this._blockSets.map((set) => set.blocks);
    return ([] as Array<Block>).concat(...allBlocks);
  }

  public initialBlockLayout: BlockNode | undefined = undefined;

  @property({ type: Array })
  private _blockLayout: BlockNode = this.initialBlockLayout || {
    direction: "horizontal",
    slots: [undefined, undefined],
    firstSlotRelativeSize: 0.5,
  };

  internalIsLayoutEmpty(blockNode: BlockNode): boolean {
    if (!blockNode) return true;
    else if ((blockNode as BlockLayout).direction)
      return (
        this.internalIsLayoutEmpty((blockNode as BlockLayout).slots[0]) &&
        this.internalIsLayoutEmpty((blockNode as BlockLayout).slots[1])
      );
    return false;
  }

  isEditingLayoutEmpty() {
    if (!this.editor) return false;
    return this.internalIsLayoutEmpty(this.editor.blockLayout);
  }

  get editor(): BlockBoardLayoutEditor {
    return this.shadowRoot?.getElementById(
      "layout-editor"
    ) as BlockBoardLayoutEditor;
  }

  save(): BlockNode {
    this._blockLayout = this.editor.blockLayout;

    this.editing = false;

    this.dispatchEvent(
      new CustomEvent("board-saved", {
        detail: { blockLayout: this._blockLayout },
        composed: true,
        bubbles: true,
      })
    );

    return this._blockLayout;
  }

  renderLayout() {
    return html`
      <block-board-layout-renderer
        style="flex: 1;"
        .blockLayout=${this._blockLayout}
        .availableBlocks=${this.availableBlocks}
      ></block-board-layout-renderer>
    `;
  }

  renderEditingMode() {
    return html`
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
    if (this.editing) return this.renderEditingMode();
    else return this.renderLayout();
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  static get scopedElements() {
    return {
      "mwc-drawer": Drawer,
      "block-board-layout-renderer": BlockBoardLayoutRenderer,
      "block-board-layout-editor": BlockBoardLayoutEditor,
      "block-board-block-selector": BlockBoardBlockSelector,
    };
  }
}
