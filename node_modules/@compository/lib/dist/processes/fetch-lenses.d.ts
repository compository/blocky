import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
import { SetupLenses } from '../types/lenses';
export declare function fetchLensesForZome(compositoryService: CompositoryService, cellId: CellId, zomeIndex: number): Promise<[ZomeDef, SetupLenses?]>;
export declare function fetchLensesForAllZomes(compositoryService: CompositoryService, cellId: CellId): Promise<Array<[ZomeDef, SetupLenses?]>>;
