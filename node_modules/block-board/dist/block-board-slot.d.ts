import { LitElement } from "lit-element";
import { Block } from "./types";
export declare class BlockBoardSlot extends LitElement {
    block: Block;
    _slot: HTMLElement;
    firstUpdated(): void;
    render(): import("lit-element").TemplateResult;
}
