import { AppWebsocket, CellId } from '@holochain/conductor-api';
export declare class BlockyService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    constructor(appWebsocket: AppWebsocket, cellId: CellId);
}
