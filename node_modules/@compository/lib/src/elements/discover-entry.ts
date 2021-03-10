import { html, LitElement, property, PropertyValues, query } from 'lit-element';
import { discoverEntryDetails } from '../processes/discover';
import { CompositoryScope } from './compository-scope';
import { fetchLensesForZome } from '../processes/fetch-lenses';
import { CompositoryService } from '../services/compository-service';
import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { importModuleFromFile } from '../processes/import-module-from-file';
import { BaseCompositoryService } from './base';

export abstract class DiscoverEntry extends BaseCompositoryService {
  @property({ type: String })
  entryUri!: string;

  @property({ type: Boolean })
  _loading = true;

  @query('#scope')
  _scope!: CompositoryScope;

  async loadRenderers() {
    const {
      cellId,
      zomeIndex,
      entryDefIndex,
      entryHash,
    } = await discoverEntryDetails(this._compositoryService, this.entryUri);

    const [def, renderersFile] = await fetchLensesForZome(
      this._compositoryService,
      cellId,
      zomeIndex
    );

    if (renderersFile) {
      const renderers = await importModuleFromFile(renderersFile);

      const entryIdStr = def.entry_defs[entryDefIndex];
      renderers
        .default(this._compositoryService.appWebsocket as AppWebsocket, cellId)
        .entryLenses[entryIdStr].render(
          this._scope.shadowRoot as ShadowRoot,
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

  static get scopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
    };
  }
}
