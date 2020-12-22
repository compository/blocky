import { LitElement, TemplateResult, Constructor } from "lit-element";
import { BlockLayoutNode, Block, BlockSlot } from "./types";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutRenderer_base: Constructor<LitElement>;
export declare class BlockBoardLayoutRenderer extends BlockBoardLayoutRenderer_base {
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        "block-board-slot": typeof BlockBoardSlot;
    };
    availableBlocks: Array<Block>;
    blockLayout: BlockSlot;
    renderSlot(slot: BlockSlot): TemplateResult;
    renderLayout(blockLayout: BlockLayoutNode): TemplateResult;
    render(): TemplateResult;
}
export {};
