import { LitElement } from 'lit-element';
import { BlockBoard, BlockLayoutNode, BlockSet } from 'block-board';
import { CellId } from '@holochain/conductor-api';
import { CircularProgress } from 'scoped-material-components/dist/mwc-circular-progress';
import { Fab } from 'scoped-material-components/dist/mwc-fab';
import { BlockyService } from '../blocky.service';
declare const BlockyBlockBoard_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
} & import("lit-element").Constructor<{
    context: {
        membrane: import("holochain-membrane-context").MembraneContext;
    };
    cellId: CellId;
    appWebsocket: import("@holochain/conductor-api").AppWebsocket;
    adminWebsocket: import("@holochain/conductor-api").AdminWebsocket;
}>;
export declare class BlockyBlockBoard extends BlockyBlockBoard_base {
    compositoryCellId: CellId;
    static get scopedElements(): {
        'block-board': typeof BlockBoard;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-fab': typeof Fab;
    };
    static get styles(): import("lit-element").CSSResult;
    _blockSets: Array<BlockSet> | undefined;
    _blockLayout: BlockLayoutNode | undefined;
    get blockyService(): BlockyService;
    get board(): BlockBoard;
    firstUpdated(): Promise<void>;
    createBoard(layout: BlockLayoutNode): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
