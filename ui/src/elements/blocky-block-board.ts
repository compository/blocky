import { css, html, LitElement, property } from 'lit-element';
import {
  CompositoryService,
  fetchRenderersForAllZomes,
  StandaloneRenderer,
} from 'compository';
import { Block, BlockBoard, BlockLayoutNode, BlockSet } from 'block-board';
import { membraneContext } from 'holochain-membrane-context';
import { CellId } from '@holochain/conductor-api';
import { Scoped } from 'scoped-elements';
import { CircularProgress } from 'scoped-material-components/dist/mwc-circular-progress';
import { Fab } from 'scoped-material-components/dist/mwc-fab';
import { BlockyService } from '../blocky.service';

export class BlockyBlockBoard extends membraneContext(Scoped(LitElement)) {
  @property()
  compositoryCellId!: CellId;

  static get scopedElements() {
    return {
      'block-board': BlockBoard,
      'mwc-circular-progress': CircularProgress,
      'mwc-fab': Fab,
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
      }
      .fab {
        position: fixed;
        right: 40px;
        bottom: 40px;
      }
    `;
  }

  @property({ type: Array })
  _blockSets: Array<BlockSet> | undefined = undefined;
  @property({ type: Array })
  _blockLayout: BlockLayoutNode | undefined = undefined;

  get blockyService(): BlockyService {
    return new BlockyService(this.appWebsocket, this.cellId);
  }
  get board(): BlockBoard {
    return this.shadowRoot?.getElementById('board') as BlockBoard;
  }

  async firstUpdated() {
    // Get the renderers for each of the zomes
    const zomeRenderers = await fetchRenderersForAllZomes(
      new CompositoryService(this.appWebsocket, this.compositoryCellId),
      this.cellId
    );

    this._blockSets = zomeRenderers
      .filter(([def, renderers]) => renderers !== undefined)
      .map(([def, renderers]) => ({
        name: def.name,
        blocks: renderers?.standalone,
      }) as BlockSet);

    const layouts = await this.blockyService.getAllBoardLayouts();
    this._blockLayout = layouts[0];
  }

  async createBoard(layout: BlockLayoutNode) {
    this._blockLayout = layout;
    return this.blockyService.createBoardLayout(layout);
  }

  render() {
    if (this._blockSets === undefined)
      return html`<mwc-circular-progress></mwc-circular-progress>`;
    return html`<block-board
        id="board"
        style="flex: 1;"
        .blockSets=${this._blockSets}
        .blockLayout=${this._blockLayout}
        @board-saved=${(e: CustomEvent) =>
          this.createBoard(e.detail.blockLayout)}
      ></block-board>

      ${this.board?.editing
        ? html``
        : html`
            <mwc-fab label="edit" class="fab">
              <mwc-icon-button
                slot="icon"
                @click=${() => (this.board.editing = true)}
                >edit</mwc-icon-button
              >
            </mwc-fab>
          `} `;
  }
}
