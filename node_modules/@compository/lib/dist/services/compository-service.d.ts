import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { FileStorageService } from '@holochain-open-dev/file-storage';
import { DnaTemplate, PublishInstantiatedDnaInput, ZomeDef } from '../types/dnas';
import { Hashed } from '@holochain-open-dev/common';
export interface GetTemplateForDnaOutput {
    dnaTemplate: DnaTemplate;
    properties: any;
    uuid: string;
}
export declare class CompositoryService extends FileStorageService {
    appWebsocket: AppWebsocket;
    protected compositoryCellId: CellId;
    constructor(appWebsocket: AppWebsocket, compositoryCellId: CellId);
    /** Getters */
    getTemplateForDna(dnaHash: string): Promise<GetTemplateForDnaOutput>;
    getZomeDef(zomeDefHash: string): Promise<ZomeDef>;
    getDnaTemplate(dnaTemplateHash: string): Promise<DnaTemplate>;
    getAllZomeDefs(): Promise<Array<Hashed<ZomeDef>>>;
    getAllInstantiatedDnas(): Promise<Array<string>>;
    /** Creators */
    publishDnaTemplate(dnaTemplate: DnaTemplate): Promise<string>;
    publishInstantiatedDna(input: PublishInstantiatedDnaInput): Promise<string>;
    private callZome;
}
