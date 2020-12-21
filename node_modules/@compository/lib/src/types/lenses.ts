import { AppWebsocket, CellId } from '@holochain/conductor-api';

export type Dictionary<T> = { [key: string]: T };

export interface Lenses {
  standalone: Array<StandaloneLens>;
  // Key is the entry id
  entryLenses: Dictionary<EntryLens>;
  attachmentsLenses: Array<AttachmentLens>;
}

export interface Lens {
  name: string;
}
export interface StandaloneLens extends Lens {
  render: (
    root: ShadowRoot,
    appWebsocket: AppWebsocket,
    cellId: CellId
  ) => void;
}

export interface EntryLens extends Lens {
  render: (
    root: ShadowRoot,
    appWebsocket: AppWebsocket,
    cellId: CellId,
    entryHash: string
  ) => void;
}

export interface AttachmentLens extends Lens {
  render: (
    root: ShadowRoot,
    appWebsocket: AppWebsocket,
    cellId: CellId,
    entryHash: string
  ) => void;
}
