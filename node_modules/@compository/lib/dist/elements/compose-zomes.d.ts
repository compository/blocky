import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CheckListItem } from 'scoped-material-components/mwc-check-list-item';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { CellId } from '@holochain/conductor-api';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { HoloHashed } from '@holochain-open-dev/core-types';
import { Card } from 'scoped-material-components/mwc-card';
import { ZomeDef } from '../types/dnas';
import { InstallDnaDialog } from './install-dna-dialog';
import { BaseCompositoryService } from './base';
export declare abstract class ComposeZomes extends BaseCompositoryService {
    zomeDefs: Array<HoloHashed<ZomeDef>>;
    _installDnaDialog: InstallDnaDialog;
    _dnaTemplateToClone: string | undefined;
    _selectedIndexes: Set<number>;
    _templateName: string | undefined;
    static get styles(): import("lit-element").CSSResult[];
    firstUpdated(): void;
    loadZomes(): Promise<void>;
    createDnaTemplate(): Promise<void>;
    publishInstantiatedDna(cellId: CellId): Promise<void>;
    renderErrorSnackbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-list': typeof List;
        'mwc-check-list-item': typeof CheckListItem;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
        'install-dna-dialog': {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
        'mwc-card': typeof Card;
        'mwc-snackbar': typeof Snackbar;
    };
}
