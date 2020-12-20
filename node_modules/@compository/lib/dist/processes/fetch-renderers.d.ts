import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
import { ScopedRenderers } from '../types/scoped-renderers';
export declare function fetchRenderersForZome(compositoryService: CompositoryService, cellId: CellId, zomeIndex: number): Promise<[ZomeDef, ScopedRenderers?]>;
export declare function fetchRenderersForAllZomes(compositoryService: CompositoryService, cellId: CellId): Promise<Array<[ZomeDef, ScopedRenderers?]>>;
