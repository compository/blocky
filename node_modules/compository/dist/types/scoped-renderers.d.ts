import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { LitElement } from 'lit-element';
import { ZomeDef } from './dnas';
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface ScopedRenderers {
    standalone: Array<StandaloneRenderer>;
    entryRenderers: Dictionary<EntryRenderer>;
    entryAttachments: Array<AttachmentRenderer>;
}
export declare type SetupRenderers = (appWebsocket: AppWebsocket, cellId: CellId) => Promise<ScopedRenderers>;
export interface Renderer {
    name: string;
}
export interface StandaloneRenderer extends Renderer {
    render: (root: ShadowRoot, registry: CustomElementRegistry) => void;
}
export interface EntryRenderer extends Renderer {
    render: (root: ShadowRoot, registry: CustomElementRegistry, entryHash: string) => void;
}
export interface AttachmentRenderer extends Renderer {
    render: (root: ShadowRoot, registry: CustomElementRegistry, entryHash: string) => void;
}
export declare type ScopeHost = LitElement & ScopedElementsHost;
export interface ZomeRenderers {
    renderers: ScopedRenderers;
    def: ZomeDef;
}
