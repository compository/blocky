import { LitElement, PropertyValues } from "lit-element";
import { Block } from "./types";
export declare class BlockBoardSlot extends LitElement {
    block: Block;
    _slot: HTMLElement;
    updated(changedValues: PropertyValues): void;
    render(): import("lit-element").TemplateResult;
}
