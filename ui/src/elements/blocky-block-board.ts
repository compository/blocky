import { html, LitElement, property } from 'lit-element';
import {
  CompositoryService,
  fetchRenderersForAllZomes,
  StandaloneRenderer,
} from 'compository';
import { Block, BlockBoard } from 'block-board';
import { membraneContext } from 'holochain-membrane-context';
import { CellId } from '@holochain/conductor-api';
import { Scoped } from 'scoped-elements';
import { CircularProgress } from '@material/mwc-circular-progress';

export class BlockyBlockBoard extends membraneContext(Scoped(LitElement)) {
  @property()
  compositoryCellId!: CellId;

  static get scopedElements() {
    return {
      'block-board': BlockBoard,
      'mwc-circular-progress': CircularProgress,
    };
  }

  @property({ type: Array })
  _blocks: Array<Block> | undefined = undefined;

  async firstUpdated() {
    // Get the renderers for each of the zomes
    const zomeRenderers = await fetchRenderersForAllZomes(
      new CompositoryService(this.appWebsocket, this.compositoryCellId),
      this.cellId
    );

    const standaloneRenderers = zomeRenderers.map(r => r.renderers.standalone);

    const flattened = ([] as StandaloneRenderer[]).concat(
      ...standaloneRenderers
    );

    this._blocks = flattened;
  }

  render() {
    if (this._blocks === undefined)
      return html`<mwc-circular-progress></mwc-circular-progress>`;
    return html`<block-board .availableBlocks=${this._blocks}></block-board>`;
  }
}
