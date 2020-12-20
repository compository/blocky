import { AppWebsocket, CellId } from '@holochain/conductor-api';
import * as msgpack from '@msgpack/msgpack';
import { FileStorageService } from '@holochain-open-dev/file-storage';
import { DnaTemplate, Hashed, PublishInstantiatedDnaInput, ZomeDef } from '../types/dnas';

export interface GetTemplateForDnaOutput {
  dnaTemplate: DnaTemplate;
  properties: any;
  uuid: string;
}

export class CompositoryService extends FileStorageService {
  constructor(
    public appWebsocket: AppWebsocket,
    protected compositoryCellId: CellId
  ) {
    super(appWebsocket, compositoryCellId, 'file_storage');
  }

  /** Getters */

  async getTemplateForDna(dnaHash: string): Promise<GetTemplateForDnaOutput> {
    const result = await this.callZome(
      'compository',
      'get_template_for_dna',
      dnaHash
    );
    // result.properties = msgpack.decode(result.properties);
    return result;
  }

  async getZomeDef(zomeDefHash: string): Promise<ZomeDef> {
    return this.callZome('compository', 'get_zome_def', zomeDefHash);
  }
  async getDnaTemplate(dnaTemplateHash: string): Promise<DnaTemplate> {
    return this.callZome('compository', 'get_dna_template', dnaTemplateHash);
  }

  async getAllZomeDefs(): Promise<Array<Hashed<ZomeDef>>> {
    return this.callZome('compository', 'get_all_zome_defs', null);
  }

  /** Creators */

  async publishDnaTemplate(dnaTemplate: DnaTemplate): Promise<string> {
    return this.callZome('compository', 'publish_dna_template', dnaTemplate)
  }
  async publishInstantiatedDna(input: PublishInstantiatedDnaInput): Promise<string> {
    return this.callZome('compository', 'publish_instantiated_dna', input)
  }

  private callZome(zome: string, fnName: string, payload: any) {
    return this.appWebsocket.callZome({
      cap: null,
      cell_id: this.compositoryCellId,
      fn_name: fnName,
      payload: payload,
      provenance: this.compositoryCellId[1],
      zome_name: zome,
    });
  }
}
