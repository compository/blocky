import { LitElement } from "lit-element";
import { Block } from "./block";
export declare class BlockBoardBlockSelector extends LitElement {
    static styles: import("lit-element").CSSResult;
    private availableBlocks;
    onDragStart(e: DragEvent, block: Block): void;
    render(): import("lit-element").TemplateResult;
}
