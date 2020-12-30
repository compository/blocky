import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { BlockNode } from 'block-board';
export declare class BlockyService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    createBoardNode(layout: BlockNode): Promise<string>;
    getAllBoardLayouts(): Promise<Array<BlockNode>>;
    private callZome;
}
