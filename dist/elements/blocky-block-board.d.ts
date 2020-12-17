import { LitElement } from 'lit-element';
import { Block, BlockBoard } from 'block-board';
import { CellId } from '@holochain/conductor-api';
import { CircularProgress } from '@material/mwc-circular-progress';
declare const BlockBlockBoard_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
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
export declare class BlockBlockBoard extends BlockBlockBoard_base {
    compositoryCellId: CellId;
    static get scopedElements(): {
        'block-board': typeof BlockBoard;
        'mwc-circular-progress': typeof CircularProgress;
    };
    _blocks: Array<Block> | undefined;
    firstUpdated(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
