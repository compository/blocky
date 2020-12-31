import { LitElement, Constructor } from "lit-element";
import { ListItem } from "scoped-material-components/mwc-list-item";
import { List } from "scoped-material-components/mwc-list";
import { Block, BlockSet } from "./types";
declare const BlockBoardBlockSelector_base: Constructor<LitElement>;
export declare class BlockBoardBlockSelector extends BlockBoardBlockSelector_base {
    static styles: import("lit-element").CSSResult;
    blockSets: Array<BlockSet>;
    onDragStart(e: DragEvent, block: Block): void;
    renderBlockSet(set: BlockSet): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        "mwc-list": typeof List;
        "mwc-list-item": typeof ListItem;
    };
}
export {};
