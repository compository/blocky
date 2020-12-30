import { DnaFile } from 'bundle-dna';
import { CompositoryService } from '../services/compository-service';
import { DnaTemplate } from '../types/dnas';
export declare function generateDnaFile(compositoryService: CompositoryService, dnaTemplate: DnaTemplate, uuid: string, properties: any): Promise<DnaFile>;
