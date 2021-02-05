import { CompositoryService } from '../services/compository-service';
import { DnaTemplate } from '../types/dnas';
import { DnaFile } from '@holochain/conductor-api';
export declare function generateDnaFile(compositoryService: CompositoryService, dnaTemplate: DnaTemplate, uuid: string, properties: any): Promise<DnaFile>;
