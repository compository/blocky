import { html, LitElement, property, query } from 'lit-element';
import { discoverEntryDetails } from '../processes/discover';
import { CompositoryScope } from './compository-scope';
import { fetchRenderersForZome } from '../processes/fetch-renderers';
import { membraneContext } from 'holochain-membrane-context';
import { CompositoryService } from '../services/compository-service';

export class CompositoryDiscoverEntry extends membraneContext(LitElement) {
  @property({ type: String })
  entryUri!: string;

  @property({ type: Boolean })
  _loading = true;

  @query('#scope')
  _scope!: CompositoryScope;

  async firstUpdated() {
    const compositoryService = new CompositoryService(
      this.appWebsocket,
      this.cellId
    );
    const {
      cellId,
      zomeIndex,
      entryDefIndex,
      entryHash,
    } = await discoverEntryDetails(
      this.adminWebsocket,
      compositoryService,
      this.entryUri
    );

    const { renderers, def } = await fetchRenderersForZome(
      compositoryService,
      cellId,
      zomeIndex
    );

    const entryIdStr = def.entry_defs[entryDefIndex];
    renderers.entryRenderers[entryIdStr].render(
      this._scope.shadowRoot as ShadowRoot,
      (this._scope.shadowRoot as any).customElements as any,
      entryHash
    );

    this._loading = false;
  }

  render() {
    return html`${this._loading
        ? html`<mwc-circular-progress></mwc-circular-progress>`
        : html``}
      <compository-scope id="scope"> </compository-scope> `;
  }
}
