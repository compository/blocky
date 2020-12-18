import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { BlockLayoutNode } from 'block-board';

export class BlockyService {
  constructor(
    public appWebsocket: AppWebsocket,
    public cellId: CellId,
    public zomeName: string = 'blocky'
  ) {}

  createBoardLayout(layout: BlockLayoutNode): Promise<string> {
    return this.callZome('create_block_layout', JSON.stringify(layout));
  }

  async getAllBoardLayouts(): Promise<Array<BlockLayoutNode>> {
    const layouts = await this.callZome('get_all_block_layouts', null);

    return layouts.map(([_, l]: [string, string]) => JSON.parse(l));
  }

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
