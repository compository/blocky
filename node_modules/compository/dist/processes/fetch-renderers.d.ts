import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeRenderers } from '../types/scoped-renderers';
export declare function fetchRenderersForZome(compositoryService: CompositoryService, cellId: CellId, zomeIndex: number): Promise<ZomeRenderers>;
export declare function fetchRenderersForAllZomes(compositoryService: CompositoryService, cellId: CellId): Promise<Array<ZomeRenderers>>;
