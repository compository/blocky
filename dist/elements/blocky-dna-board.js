import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { membraneContext, MembraneContextProvider, } from '@holochain-open-dev/membrane-context';
import { serializeHash } from '@holochain-open-dev/common';
import { TopAppBar } from 'scoped-material-components/mwc-top-app-bar';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { HodCreateProfileForm, ProfilesService, } from '@holochain-open-dev/profiles';
import { CompositoryService, fetchLensesForAllZomes } from '@compository/lib';
import { sharedStyles } from '../sharedStyles';
import { BlockyService } from '../blocky.service';
import { BlockBoard } from 'block-board';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
export class BlockyDnaBoard extends membraneContext(Scoped(LitElement)) {
    constructor() {
        super(...arguments);
        this._profilesZomeExistsInDna = false;
        this._profileAlreadyCreated = false;
        this._blockNode = undefined;
        this._blockSets = undefined;
        this._editing = false;
        this._loading = true;
    }
    get board() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('board');
    }
    get blockyService() {
        return new BlockyService(this.membraneContext.appWebsocket, this.membraneContext.cellId);
    }
    get compositoryService() {
        return new CompositoryService(this.membraneContext.appWebsocket, this.membraneContext.cellId);
    }
    async firstUpdated() {
        await this.loadProfilesExists();
        const layouts = await this.blockyService.getAllBoardLayouts();
        this._blockNode = layouts[0];
        await this.loadRenderers();
        this._loading = false;
    }
    async loadProfilesExists() {
        const dnaTemplate = await this.compositoryService.getTemplateForDna(serializeHash(this.cellIdToDisplay[0]));
        this._profilesZomeExistsInDna = !!dnaTemplate.dnaTemplate.zome_defs.find(zome => zome.name === 'profiles');
        if (this._profilesZomeExistsInDna) {
            const profileService = new ProfilesService(this.membraneContext.appWebsocket, this.cellIdToDisplay);
            const myProfile = await profileService.getMyProfile();
            this._profileAlreadyCreated = !!myProfile;
        }
    }
    async loadRenderers() {
        // Get the renderers for each of the zomes
        const zomeLenses = await fetchLensesForAllZomes(this.compositoryService, this.cellIdToDisplay);
        this._blockSets = zomeLenses
            .filter(([def, lenses]) => lenses !== undefined)
            .map(([def, lenses]) => ({
            name: def.name,
            blocks: lenses === null || lenses === void 0 ? void 0 : lenses.standalone.map(s => ({
                name: s.name,
                render: (root) => s.render(root, this.membraneContext.appWebsocket, this.cellIdToDisplay),
            })),
        }));
        this._editing = !this._blockNode;
    }
    async createBoard(layout) {
        this._editing = false;
        if (JSON.stringify(this._blockNode) !== JSON.stringify(layout)) {
            this._blockNode = layout;
            await this.blockyService.createBoardNode(layout);
        }
    }
    showProfilePromt() {
        return (!this._loading &&
            this._profilesZomeExistsInDna &&
            !this._profileAlreadyCreated);
    }
    renderBarItems() {
        if (this._loading || this.showProfilePromt())
            return html ``;
        if (!this._editing)
            return html ` <mwc-button
        icon="edit"
        slot="actionItems"
        @click=${() => {
                this._editing = true;
            }}
        >Edit</mwc-button
      >`;
        else
            return html `<mwc-button
          icon="save"
          slot="actionItems"
          @click=${() => {
                const newLayout = this.board.save();
                this.createBoard(newLayout);
            }}
          >Save</mwc-button
        >
        <mwc-button
          icon="cancel"
          slot="actionItems"
          @click=${() => {
                this._editing = false;
            }}
          >Cancel</mwc-button
        >`;
    }
    renderContent() {
        if (this._loading)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        else if (this.showProfilePromt())
            return html `
        <div
          style="flex: 1; display: flex; align-items: center; justify-content: center;"
        >
          <hod-create-profile-form
            @profile-created=${() => (this._profileAlreadyCreated = true)}
          ></hod-create-profile-form>
        </div>
      `;
        else
            return html `
        <block-board
          id="board"
          style="flex: 1;"
          .editing=${this._editing}
          .blockSets=${this._blockSets}
          ?blockLayout=${this._blockNode}
        ></block-board>
      `;
    }
    render() {
        return html `<membrane-context-provider
        .appWebsocket=${this.membraneContext.appWebsocket}
        .cellId=${this.cellIdToDisplay}
      >
        <mwc-top-app-bar style="flex: 1; display: flex;">
          <mwc-icon-button
            icon="arrow_back"
            slot="navigationIcon"
            @click=${() => this.dispatchEvent(new CustomEvent('navigate-back'))}
          ></mwc-icon-button>
          <div slot="title">${serializeHash(this.cellIdToDisplay[0])}</div>
  
          ${this.renderBarItems()}

          <div style="width: 100vw; height: 100%; display: flex;">
            ${this.renderContent()}
              </div>
          </div>
        </mwc-top-app-bar>
      </membrane-context-provider>`;
    }
    static get scopedElements() {
        return {
            'membrane-context-provider': MembraneContextProvider,
            'block-board': BlockBoard,
            'mwc-top-app-bar': TopAppBar,
            'mwc-icon-button': IconButton,
            'mwc-circular-progress': CircularProgress,
            'hod-create-profile-form': HodCreateProfileForm,
        };
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
      `,
        ];
    }
}
__decorate([
    property({ type: Array })
], BlockyDnaBoard.prototype, "cellIdToDisplay", void 0);
__decorate([
    property({ type: Array })
], BlockyDnaBoard.prototype, "compositoryCellId", void 0);
__decorate([
    property({ type: Boolean })
], BlockyDnaBoard.prototype, "_profilesZomeExistsInDna", void 0);
__decorate([
    property({ type: Boolean })
], BlockyDnaBoard.prototype, "_profileAlreadyCreated", void 0);
__decorate([
    property({ type: Object })
], BlockyDnaBoard.prototype, "_blockNode", void 0);
__decorate([
    property({ type: Array })
], BlockyDnaBoard.prototype, "_blockSets", void 0);
__decorate([
    property({ type: Boolean })
], BlockyDnaBoard.prototype, "_editing", void 0);
__decorate([
    property({ type: Boolean })
], BlockyDnaBoard.prototype, "_loading", void 0);
//# sourceMappingURL=blocky-dna-board.js.map