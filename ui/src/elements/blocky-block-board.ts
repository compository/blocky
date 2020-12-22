import {
  Constructor,
  css,
  html,
  LitElement,
  property,
  PropertyValues,
} from 'lit-element';
import { CompositoryService, fetchLensesForAllZomes } from '@compository/lib';
import { Block, BlockBoard, BlockLayoutNode, BlockSet } from 'block-board';
import { membraneContext } from '@holochain-open-dev/membrane-context';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Fab } from 'scoped-material-components/mwc-fab';
import { BlockyService } from '../blocky.service';

export class BlockyBlockBoard extends membraneContext(
  Scoped(LitElement) as Constructor<LitElement>
) {
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
    return new BlockyService(
      this.membraneContext.appWebsocket as AppWebsocket,
      this.membraneContext.cellId as CellId
    );
  }
  get board(): BlockBoard {
    return this.shadowRoot?.getElementById('board') as BlockBoard;
  }

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);
    if (
      changedValues.has('membraneContext') &&
      this.membraneContext.appWebsocket
    ) {
      this.loadRenderers();
    }
  }

  async loadRenderers() {
    // Get the renderers for each of the zomes
    const zomeLenses = await fetchLensesForAllZomes(
      new CompositoryService(
        this.membraneContext.appWebsocket as AppWebsocket,
        this.compositoryCellId
      ),
      this.membraneContext.cellId as CellId
    );

    this._blockSets = zomeLenses
      .filter(([def, lenses]) => lenses !== undefined)
      .map(
        ([def, lenses]) =>
          ({
            name: def.name,
            blocks: lenses?.standalone.map(s => ({
              name: s.name,
              render: (root: ShadowRoot) =>
                s.render(
                  root,
                  this.membraneContext.appWebsocket as AppWebsocket,
                  this.membraneContext.cellId as CellId
                ),
            })),
          } as BlockSet)
      );

    const layouts = await this.blockyService.getAllBoardLayouts();
    this._blockLayout = layouts[0];

    setTimeout(() => {
      this.board.editing = !this._blockLayout;
      this.requestUpdate();
    });
  }

  async createBoard(layout: BlockLayoutNode) {
    this.board.editing = false;

    this.requestUpdate();

    if (JSON.stringify(this._blockLayout) !== JSON.stringify(layout)) {
      this._blockLayout = layout;
      await this.blockyService.createBoardLayout(layout);
    }
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

      ${this.board && !this.board.editing
        ? html`
            <mwc-fab
              label="edit"
              class="fab"
              @click=${() => {
                this.board.editing = true;
                this.requestUpdate();
              }}
              icon="edit"
            >
            </mwc-fab>
          `
        : html``} `;
  }
}
