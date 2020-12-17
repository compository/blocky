import { LitElement, TemplateResult } from "lit-element";
import { BlockLayoutNode, Block, BlockSlot } from "./block";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutRenderer_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class BlockBoardLayoutRenderer extends BlockBoardLayoutRenderer_base {
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        'block-board-slot': typeof BlockBoardSlot;
    };
    availableBlocks: Array<Block>;
    blockLayout: BlockLayoutNode;
    renderSlot(slot: BlockSlot): TemplateResult;
    renderNode(blockLayout: BlockLayoutNode): TemplateResult;
    render(): TemplateResult;
}
export {};
