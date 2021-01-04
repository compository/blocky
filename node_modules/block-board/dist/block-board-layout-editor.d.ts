import { LitElement, TemplateResult, Constructor } from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { Block, BlockLayout, BlockNode } from "./types";
import { IconButton } from "scoped-material-components/mwc-icon-button";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutEditor_base: Constructor<LitElement>;
export declare class BlockBoardLayoutEditor extends BlockBoardLayoutEditor_base {
    static styles: import("lit-element").CSSResult;
    private availableBlocks;
    initialBlockLayout: BlockNode;
    protected _blockLayout: BlockNode;
    connectedCallback(): void;
    getEditingBlockLayout(): BlockNode;
    static get scopedElements(): {
        "block-board-slot": typeof BlockBoardSlot;
        "vaadin-split-layout": typeof SplitLayoutElement;
        "mwc-icon-button": typeof IconButton;
    };
    renderBlockNode(blockName: string | undefined, parent?: {
        node: BlockLayout;
        slotIndex: number;
    }, grandparent?: {
        node: BlockLayout;
        slotIndex: number;
    }): TemplateResult;
    updateLayout(): void;
    findBlock(blockName: string): Block | undefined;
    renderLayoutNode(blockLayout: BlockLayout, parentNode?: {
        node: BlockLayout;
        slotIndex: number;
    }): TemplateResult;
    render(): TemplateResult;
}
export {};
