import { LitElement } from 'lit-element';
import { CompositoryService } from '../services/compository-service';
import { Hashed, ZomeDef } from '../types/dnas';
import { Button } from '@material/mwc-button';
import { List } from '@material/mwc-list';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { CircularProgress } from '@material/mwc-circular-progress';
import { CompositoryInstallDnaDialog } from './compository-install-dna-dialog';
declare const CompositoryComposeZomes_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
} & import("lit-element").Constructor<{
    context: {
        membrane: import("holochain-membrane-context").MembraneContext;
    };
    cellId: import("@holochain/conductor-api").CellId;
    appWebsocket: import("@holochain/conductor-api").AppWebsocket;
    adminWebsocket: import("@holochain/conductor-api").AdminWebsocket;
}>;
export declare class CompositoryComposeZomes extends CompositoryComposeZomes_base {
    zomeDefs: Array<Hashed<ZomeDef>>;
    _installDnaDialog: CompositoryInstallDnaDialog;
    _selectedIndexes: Set<number>;
    static get styles(): import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-list': typeof List;
        'mwc-check-list-item': typeof CheckListItem;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-button': typeof Button;
        'compository-install-dna-dialog': typeof CompositoryInstallDnaDialog;
    };
    get _compositoryService(): CompositoryService;
    firstUpdated(): Promise<void>;
    createDnaTemplate(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
