import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { BlockLayoutNode } from 'block-board';
export declare class BlockyService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    createBoardLayout(layout: BlockLayoutNode): Promise<string>;
    getAllBoardLayouts(): Promise<Array<BlockLayoutNode>>;
    private callZome;
}
