import { LitElement, TemplateResult, Constructor } from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { Block, BlockLayoutNode } from "./types";
import { IconButton } from "scoped-material-components/mwc-icon-button";
import { CircularProgress } from "scoped-material-components/mwc-circular-progress";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutEditor_base: Constructor<LitElement>;
export declare class BlockBoardLayoutEditor extends BlockBoardLayoutEditor_base {
    static styles: import("lit-element").CSSResult;
    private availableBlocks;
    blockLayout: BlockLayoutNode;
    static get scopedElements(): {
        "block-board-slot": typeof BlockBoardSlot;
        "vaadin-split-layout": typeof SplitLayoutElement;
        "mwc-icon-button": typeof IconButton;
        "mwc-circular-progress": typeof CircularProgress;
    };
    firstUpdated(): void;
    renderBlockSlot(blockName: string | undefined, parentNode: BlockLayoutNode, slotIndex: number): TemplateResult;
    findBlock(blockName: string): Block | undefined;
    renderLayoutNode(blockLayout: BlockLayoutNode): TemplateResult;
    render(): TemplateResult;
}
export {};
