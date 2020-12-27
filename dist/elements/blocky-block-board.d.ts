import { Constructor, LitElement, PropertyValues } from 'lit-element';
import { BlockBoard, BlockLayoutNode, BlockSet } from 'block-board';
import { CellId } from '@holochain/conductor-api';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { BlockyService } from '../blocky.service';
declare const BlockyBlockBoard_base: Constructor<LitElement> & Constructor<{
    membraneContext: import("@holochain-open-dev/membrane-context").MembraneContext;
}>;
export declare class BlockyBlockBoard extends BlockyBlockBoard_base {
    compositoryCellId: CellId;
    editing: boolean;
    static get scopedElements(): {
        'block-board': typeof BlockBoard;
        'mwc-circular-progress': typeof CircularProgress;
    };
    static get styles(): import("lit-element").CSSResult[];
    _blockSets: Array<BlockSet> | undefined;
    _blockLayout: BlockLayoutNode | undefined;
    get blockyService(): BlockyService;
    get board(): BlockBoard;
    updated(changedValues: PropertyValues): void;
    loadRenderers(): Promise<void>;
    createBoard(layout: BlockLayoutNode): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
