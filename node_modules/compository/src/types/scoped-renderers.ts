import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { LitElement } from 'lit-element';
import { ZomeDef } from './dnas';

export type Dictionary<T> = { [key: string]: T };

export interface ScopedRenderers {
  standalone: Array<StandaloneRenderer>;
  // Key is the entry id
  entryRenderers: Dictionary<EntryRenderer>;
  entryAttachments: Array<AttachmentRenderer>;
}

export type SetupRenderers = (
  appWebsocket: AppWebsocket,
  cellId: CellId
) => Promise<ScopedRenderers>;

export interface Renderer {
  name: string;
}
export interface StandaloneRenderer extends Renderer {
  render: (root: ShadowRoot, registry: CustomElementRegistry) => void;
}

export interface EntryRenderer extends Renderer {
  render: (
    root: ShadowRoot,
    registry: CustomElementRegistry,
    entryHash: string
  ) => void;
}

export interface AttachmentRenderer extends Renderer {
  render: (
    root: ShadowRoot,
    registry: CustomElementRegistry,
    entryHash: string
  ) => void;
}

export type ScopeHost = LitElement & ScopedElementsHost;
