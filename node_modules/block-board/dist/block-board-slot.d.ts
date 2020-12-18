import { LitElement } from "lit-element";
import { Block } from "./types";
declare const BlockBoardSlot_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class BlockBoardSlot extends BlockBoardSlot_base {
    block: Block;
    _slot: HTMLElement;
    firstUpdated(): void;
    render(): import("lit-element").TemplateResult;
}
export {};
