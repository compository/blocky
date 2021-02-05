import { Constructor } from 'lit-element';
import { CellId } from '@holochain/conductor-api';
import { TopAppBar } from 'scoped-material-components/mwc-top-app-bar';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { BaseElement } from '@holochain-open-dev/common';
import { CompositoryService } from '@compository/lib';
import { BlockyService } from '../blocky.service';
import { BlockBoard, BlockNode, BlockSet } from 'block-board';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';
declare const BlockyDnaBoard_base: typeof BaseElement & Constructor<{
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
    getScopedElements(): {
        'membrane-context-provider': {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
        'block-board': typeof BlockBoard;
        'mwc-top-app-bar': typeof TopAppBar;
        'mwc-button': typeof Button;
        'mwc-icon-button': typeof IconButton;
        'mwc-circular-progress': typeof CircularProgress;
        'create-profile-form': Constructor<HTMLElement>;
    };
    static get styles(): import("lit-element").CSSResult[];
}
export {};
