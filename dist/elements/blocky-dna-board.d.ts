import { Constructor, LitElement } from 'lit-element';
import { MembraneContextProvider } from '@holochain-open-dev/membrane-context';
import { CellId } from '@holochain/conductor-api';
import { TopAppBar } from 'scoped-material-components/mwc-top-app-bar';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { HodCreateProfileForm } from '@holochain-open-dev/profiles';
import { CompositoryService } from '@compository/lib';
import { BlockyService } from '../blocky.service';
import { BlockBoard, BlockNode, BlockSet } from 'block-board';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';
declare const BlockyDnaBoard_base: Constructor<LitElement> & Constructor<{
    membraneContext: import("@holochain-open-dev/membrane-context").MembraneContext;
}>;
export declare class BlockyDnaBoard extends BlockyDnaBoard_base {
    cellIdToDisplay: CellId;
    compositoryCellId: CellId;
    _profilesZomeExistsInDna: boolean;
    _profileAlreadyCreated: boolean;
    _savedBlockNode: BlockNode | undefined;
    _blockSets: Array<BlockSet> | undefined;
    _editing: boolean;
    _loading: boolean;
    get board(): BlockBoard;
    get blockyService(): BlockyService;
    get compositoryService(): CompositoryService;
    firstUpdated(): Promise<void>;
    loadSavedNodes(): Promise<void>;
    loadProfilesExists(): Promise<void>;
    loadRenderers(): Promise<void>;
    createBoard(layout: BlockNode): Promise<void>;
    showProfilePromt(): boolean;
    renderBarItems(): import("lit-element").TemplateResult;
    renderContent(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'membrane-context-provider': typeof MembraneContextProvider;
        'block-board': typeof BlockBoard;
        'mwc-top-app-bar': typeof TopAppBar;
        'mwc-button': typeof Button;
        'mwc-icon-button': typeof IconButton;
        'mwc-circular-progress': typeof CircularProgress;
        'hod-create-profile-form': typeof HodCreateProfileForm;
    };
    static get styles(): import("lit-element").CSSResult[];
}
export {};
