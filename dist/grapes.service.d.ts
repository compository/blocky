import { AppWebsocket, CellId } from '@holochain/conductor-api';
export declare class GrapesService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    private callZome;
}
