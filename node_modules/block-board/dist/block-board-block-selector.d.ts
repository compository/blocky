import { LitElement } from "lit-element";
import { Block, BlockSet } from "./block";
export declare class BlockBoardBlockSelector extends LitElement {
    static styles: import("lit-element").CSSResult;
    blockSets: Array<BlockSet>;
    onDragStart(e: DragEvent, block: Block): void;
    renderBlockSet(set: BlockSet): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
