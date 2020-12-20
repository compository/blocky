import { AppWebsocket, CellId } from '@holochain/conductor-api';
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface ScopedRenderers {
    standalone: Array<StandaloneRenderer>;
    entry: Dictionary<EntryRenderer>;
    entryAttachments: Array<AttachmentRenderer>;
}
export interface Renderer {
    name: string;
}
export interface StandaloneRenderer extends Renderer {
    render: (root: ShadowRoot, appWebsocket: AppWebsocket, cellId: CellId) => void;
}
export interface EntryRenderer extends Renderer {
    render: (root: ShadowRoot, appWebsocket: AppWebsocket, cellId: CellId, entryHash: string) => void;
}
export interface AttachmentRenderer extends Renderer {
    render: (root: ShadowRoot, appWebsocket: AppWebsocket, cellId: CellId, entryHash: string) => void;
}
