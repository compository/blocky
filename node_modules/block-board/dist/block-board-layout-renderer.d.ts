import { LitElement, TemplateResult, Constructor } from "lit-element";
import { BlockLayout, Block, BlockNode } from "./types";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutRenderer_base: Constructor<LitElement>;
export declare class BlockBoardLayoutRenderer extends BlockBoardLayoutRenderer_base {
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        "block-board-slot": typeof BlockBoardSlot;
    };
    availableBlocks: Array<Block>;
    blockLayout: BlockNode;
    renderSlot(slot: BlockNode): TemplateResult;
    renderLayout(blockLayout: BlockLayout): TemplateResult;
    render(): TemplateResult;
}
export {};
