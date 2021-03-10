import { Dictionary } from '@holochain-open-dev/profiles';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { RenderTemplate } from './types';

export class GrapesService {
  constructor(
    public appWebsocket: AppWebsocket,
    public cellId: CellId,
    public zomeName: string = 'grapes'
  ) {}

  saveRenderTemplate(renderTemplate: RenderTemplate): Promise<string> {
    return this.callZome('save_render_template', renderTemplate);
  }

  async getAllRenderTemplates(): Promise<Dictionary<RenderTemplate>> {
    const layouts = await this.callZome('get_all_render_templates', null);

    return layouts;
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
