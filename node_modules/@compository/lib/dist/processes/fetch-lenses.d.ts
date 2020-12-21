import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
import { Lenses } from '../types/lenses';
export declare function fetchLensesForZome(compositoryService: CompositoryService, cellId: CellId, zomeIndex: number): Promise<[ZomeDef, Lenses?]>;
export declare function fetchLensesForAllZomes(compositoryService: CompositoryService, cellId: CellId): Promise<Array<[ZomeDef, Lenses?]>>;
