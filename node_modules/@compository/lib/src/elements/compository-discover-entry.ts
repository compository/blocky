import { Constructor, html, LitElement, property, PropertyValues, query } from 'lit-element';
import { discoverEntryDetails } from '../processes/discover';
import { CompositoryScope } from './compository-scope';
import { fetchRenderersForZome } from '../processes/fetch-renderers';
import { membraneContext } from '@holochain-open-dev/membrane-context';
import { CompositoryService } from '../services/compository-service';
import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';

export class CompositoryDiscoverEntry extends membraneContext(
  Scoped(LitElement) as Constructor<LitElement>
) {
  @property({ type: String })
  entryUri!: string;

  @property({ type: Boolean })
  _loading = true;

  @query('#scope')
  _scope!: CompositoryScope;

  static get scopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
    };
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('membraneContext') && this.membraneContext.appWebsocket) {
      this.loadRenderers();
    }
  }

  async loadRenderers() {
    const compositoryService = new CompositoryService(
      this.membraneContext.appWebsocket as AppWebsocket,
      this.membraneContext.cellId as CellId
    );
    const {
      cellId,
      zomeIndex,
      entryDefIndex,
      entryHash,
    } = await discoverEntryDetails(
      this.membraneContext.adminWebsocket as AdminWebsocket,
      compositoryService,
      this.entryUri
    );

    const [def, renderers] = await fetchRenderersForZome(
      compositoryService,
      cellId,
      zomeIndex
    );

    if (renderers) {
      const entryIdStr = def.entry_defs[entryDefIndex];
      renderers.entry[entryIdStr].render(
        this._scope.shadowRoot as ShadowRoot,
        this.membraneContext.appWebsocket as AppWebsocket,
        cellId,
        entryHash
      );
    }

    this._loading = false;
  }

  render() {
    return html`${this._loading
        ? html`<mwc-circular-progress></mwc-circular-progress>`
        : html``}
      <compository-scope id="scope"> </compository-scope> `;
  }
}
