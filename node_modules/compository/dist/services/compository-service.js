import { FileStorageService } from '@holochain-open-dev/file-storage';
export class CompositoryService extends FileStorageService {
    constructor(appWebsocket, compositoryCellId) {
        super(appWebsocket, compositoryCellId, 'file_storage');
        this.appWebsocket = appWebsocket;
        this.compositoryCellId = compositoryCellId;
    }
    /** Getters */
    async getTemplateForDna(dnaHash) {
        const result = await this.callZome('compository', 'get_template_for_dna', dnaHash);
        // result.properties = msgpack.decode(result.properties);
        return result;
    }
    async getZomeDef(zomeDefHash) {
        return this.callZome('compository', 'get_zome_def', zomeDefHash);
    }
    async getDnaTemplate(dnaTemplateHash) {
        return this.callZome('compository', 'get_dna_template', dnaTemplateHash);
    }
    async getAllZomeDefs() {
        return this.callZome('compository', 'get_all_zome_defs', null);
    }
    /** Creators */
    async publishDnaTemplate(dnaTemplate) {
        return this.callZome('compository', 'publish_dna_template', dnaTemplate);
    }
    async publishInstantiatedDna(input) {
        return this.callZome('compository', 'publish_instantiated_dna', input);
    }
    callZome(zome, fnName, payload) {
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
//# sourceMappingURL=compository-service.js.map