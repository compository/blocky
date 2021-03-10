import { Dictionary } from '@holochain-open-dev/profiles';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { RenderTemplate } from './types';
export declare class GrapesService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    saveRenderTemplate(renderTemplate: RenderTemplate): Promise<string>;
    getAllRenderTemplates(): Promise<Dictionary<RenderTemplate>>;
    private callZome;
}
