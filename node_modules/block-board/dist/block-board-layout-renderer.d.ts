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
    blockLayout: BlockLayoutNode;
    renderSlot(slot: BlockSlot): TemplateResult;
    renderNode(blockLayout: BlockLayoutNode): TemplateResult;
    render(): TemplateResult;
}
export {};
