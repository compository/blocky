import { AdminWebsocket } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { EntryDefLocator } from '../types/dnas';
export declare function discoverEntryDetails(adminWebsocket: AdminWebsocket, compositoryService: CompositoryService, entryUri: string): Promise<EntryDefLocator>;
