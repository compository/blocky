import { LitElement } from "lit-element";
import { Block, BlockLayoutNode } from "./block";
import "./block-board-block-selector";
import "./block-board-layout-editor";
import "./block-board-layout-renderer";
import { Drawer } from "@material/mwc-drawer";
import { IconButton } from "@material/mwc-icon-button";
import { BlockBoardLayoutEditor } from "./block-board-layout-editor";
import { BlockBoardLayoutRenderer } from "./block-board-layout-renderer";
import { BlockBoardBlockSelector } from "./block-board-block-selector";
declare const BlockBoard_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class BlockBoard extends BlockBoard_base {
    private editing;
    private _availableBlocks;
    set availableBlocks(blocks: Block[]);
    get availableBlocks(): Block[];
    savedBlockLayout: BlockLayoutNode | undefined;
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        "mwc-drawer": typeof Drawer;
        "mwc-icon-button": typeof IconButton;
        "block-board-layout-renderer": typeof BlockBoardLayoutRenderer;
        "block-board-layout-editor": typeof BlockBoardLayoutEditor;
        "block-board-block-selector": typeof BlockBoardBlockSelector;
    };
    saveLayout(): void;
    renderLayout(): import("lit-element").TemplateResult;
    renderEditingMode(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
export {};
