import { Constructor, css, html, LitElement, property } from 'lit-element';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import {
  membraneContext,
  MembraneContextProvider,
} from '@holochain-open-dev/membrane-context';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { serializeHash } from '@holochain-open-dev/common';

import { TopAppBar } from 'scoped-material-components/mwc-top-app-bar';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import {
  HodCreateProfileForm,
  ProfilesService,
} from '@holochain-open-dev/profiles';
import {
  CompositoryService,
  fetchLensesForAllZomes,
  SetupLenses,
  ZomeDef,
} from '@compository/lib';
import { sharedStyles } from '../sharedStyles';
import { BlockyService } from '../blocky.service';
import { BlockBoard, BlockNode, BlockSet } from 'block-board';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';

export class BlockyDnaBoard extends membraneContext(
  Scoped(LitElement) as Constructor<LitElement>
) {
  @property({ type: Array })
  cellIdToDisplay!: CellId;
  @property({ type: Array })
  compositoryCellId!: CellId;

  @property({ type: Boolean })
  _profilesZomeExistsInDna = false;
  @property({ type: Boolean })
  _profileAlreadyCreated = false;
  @property({ type: Object })
  _savedBlockNode: BlockNode | undefined = undefined;

  @property({ type: Array })
  _blockSets: Array<BlockSet> | undefined = undefined;

  @property({ type: Boolean })
  _editing = false;

  @property({ type: Boolean })
  _loading = true;

  get board(): BlockBoard {
    return this.shadowRoot?.getElementById('board') as BlockBoard;
  }

  get blockyService(): BlockyService {
    return new BlockyService(
      this.membraneContext.appWebsocket as AppWebsocket,
      this.cellIdToDisplay as CellId
    );
  }
  get compositoryService(): CompositoryService {
    return new CompositoryService(
      this.membraneContext.appWebsocket as any,
      this.compositoryCellId as CellId
    );
  }

  async firstUpdated() {
    await this.loadProfilesExists();

    await this.loadSavedNodes();

    await this.loadRenderers();

    this._loading = false;
  }

  async loadSavedNodes() {
    const myNodes = await this.blockyService.getMyBoardNodes();

    if (myNodes.length === 0) {
      const allNodes = await this.blockyService.getAllBoardNodes();
      this._savedBlockNode = allNodes[0];
    } else {
      this._savedBlockNode = myNodes[0];
    }

    this._editing = !this._savedBlockNode;
  }

  async loadProfilesExists() {
    const dnaTemplate = await this.compositoryService.getTemplateForDna(
      serializeHash(this.cellIdToDisplay[0])
    );
    this._profilesZomeExistsInDna = !!dnaTemplate.dnaTemplate.zome_defs.find(
      zome => zome.name === 'profiles'
    );

    if (this._profilesZomeExistsInDna) {
      const profileService = new ProfilesService(
        this.membraneContext.appWebsocket as AppWebsocket,
        this.cellIdToDisplay
      );

      const myProfile = await profileService.getMyProfile();
      this._profileAlreadyCreated = !!myProfile;
    }
  }

  async loadRenderers() {
    // Get the renderers for each of the zomes
    const zomeLenses = await fetchLensesForAllZomes(
      this.compositoryService,
      this.cellIdToDisplay
    );

    const blocks = zomeLenses.filter(
      ([def, setupLenses]) => setupLenses !== undefined
    ) as [ZomeDef, SetupLenses][];

    this._blockSets = blocks.map(
      ([def, setupLenses]) =>
        ({
          name: def.name,
          blocks: setupLenses(
            this.membraneContext.appWebsocket as AppWebsocket,
            this.cellIdToDisplay as CellId
          ).standalone.map(s => ({
            name: s.name,
            render: (root: ShadowRoot) => s.render(root),
          })),
        } as BlockSet)
    );
  }

  async createBoard(layout: BlockNode) {
    this._editing = false;
    if (JSON.stringify(this._savedBlockNode) !== JSON.stringify(layout)) {
      this._savedBlockNode = layout;
      await this.blockyService.createBoardNode(layout);
    }
  }

  showProfilePromt() {
    return (
      !this._loading &&
      this._profilesZomeExistsInDna &&
      !this._profileAlreadyCreated
    );
  }

  renderBarItems() {
    if (this._loading || this.showProfilePromt()) return html``;
    if (!this._editing)
      return html` <mwc-button
        icon="edit"
        slot="actionItems"
        label="Edit Layout"
        class="white-button"
        @click=${() => {
          this._editing = true;
        }}
      ></mwc-button>`;
    else {
      return html`<mwc-button
          icon="save"
          slot="actionItems"
          label="Save Layout"
          .disabled=${!this.board || this.board.isEditingLayoutEmpty()}
          class="white-button"
          @click=${() => {
            const newLayout = this.board.save();
            this.createBoard(newLayout);
          }}
        ></mwc-button>
        ${this._savedBlockNode
          ? html`
              <mwc-button
                icon="close"
                slot="actionItems"
                class="white-button"
                label="Cancel"
                @click=${() => {
                  this._editing = false;
                }}
              ></mwc-button>
            `
          : html``} `;
    }
  }

  renderContent() {
    if (this._loading)
      return html`<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    else if (this.showProfilePromt())
      return html`
        <div
          style="flex: 1; display: flex; align-items: center; justify-content: center;"
        >
          <hod-create-profile-form
            @profile-created=${() => (this._profileAlreadyCreated = true)}
          ></hod-create-profile-form>
        </div>
      `;
    else
      return html`
        <block-board
          id="board"
          style="flex: 1;"
          .editing=${this._editing}
          .blockSets=${this._blockSets}
          .initialBlockLayout=${this._savedBlockNode}
          @layout-updated=${() => this.requestUpdate()}
        ></block-board>
      `;
  }

  render() {
    return html`<membrane-context-provider
      .appWebsocket=${this.membraneContext.appWebsocket}
      .cellId=${this.cellIdToDisplay}
    >
      <mwc-top-app-bar style="flex: 1; display: flex;">
        <mwc-icon-button
          icon="arrow_back"
          slot="navigationIcon"
          class="white-button"
          @click=${() => this.dispatchEvent(new CustomEvent('navigate-back'))}
        ></mwc-icon-button>
        <div slot="title">${serializeHash(this.cellIdToDisplay[0])}</div>

        ${this.renderBarItems()}

        <div style="width: 100vw; height: 100%; display: flex;">
          ${this.renderContent()}
        </div>
      </mwc-top-app-bar>
    </membrane-context-provider>`;
  }

  static get scopedElements() {
    return {
      'membrane-context-provider': MembraneContextProvider,
      'block-board': BlockBoard,
      'mwc-top-app-bar': TopAppBar,
      'mwc-button': Button,
      'mwc-icon-button': IconButton,
      'mwc-circular-progress': CircularProgress,
      'hod-create-profile-form': HodCreateProfileForm,
    };
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
        .white-button {
          --mdc-button-disabled-ink-color: rgba(255, 255, 255, 0.5);
          --mdc-theme-primary: white;
        }
      `,
    ];
  }
}