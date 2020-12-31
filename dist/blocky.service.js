export class BlockyService {
    constructor(appWebsocket, cellId, zomeName = 'blocky') {
        this.appWebsocket = appWebsocket;
        this.cellId = cellId;
        this.zomeName = zomeName;
    }
    createBoardNode(layout) {
        return this.callZome('create_block_node', JSON.stringify(layout));
    }
    async getAllBoardNodes() {
        const layouts = await this.callZome('get_all_block_nodes', null);
        return layouts.map(([_, l]) => JSON.parse(l));
    }
    async getMyBoardNodes() {
        const layouts = await this.callZome('get_my_block_nodes', null);
        return layouts.map(([_, l]) => JSON.parse(l));
    }
    callZome(fnName, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            fn_name: fnName,
            payload: payload,
            provenance: this.cellId[1],
            zome_name: this.zomeName,
        });
    }
}
//# sourceMappingURL=blocky.service.js.map