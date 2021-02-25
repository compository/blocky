import { AppWebsocket, CellId } from '@holochain/conductor-api';

export class GrapesService {
  constructor(
    public appWebsocket: AppWebsocket,
    public cellId: CellId,
    public zomeName: string = 'grapes'
  ) {}
/* 
  createBoardNode(layout: BlockNode): Promise<string> {
    return this.callZome('create_block_node', JSON.stringify(layout));
  }

  async getAllBoardNodes(): Promise<Array<BlockNode>> {
    const layouts = await this.callZome('get_all_block_nodes', null);

    return layouts.map(([_, l]: [string, string]) => JSON.parse(l));
  }

  async getMyBoardNodes(): Promise<Array<BlockNode>> {
    const layouts = await this.callZome('get_my_block_nodes', null);

    return layouts.map(([_, l]: [string, string]) => JSON.parse(l));
  } */

  private callZome(fnName: string, payload: any) {
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
