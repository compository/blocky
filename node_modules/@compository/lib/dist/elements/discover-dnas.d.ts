import { Card } from 'scoped-material-components/mwc-card';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Dictionary } from '@holochain-open-dev/core-types';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Button } from 'scoped-material-components/mwc-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { GetTemplateForDnaOutput } from '../services/compository-service';
import { BaseCompositoryService } from './base';
export declare abstract class DiscoverDnas extends BaseCompositoryService {
    _loading: boolean;
    _allInstantiatedDnasHashes: Array<string> | undefined;
    _dnaTemplates: Dictionary<GetTemplateForDnaOutput>;
    firstUpdated(): Promise<void>;
    displayInstallDna(dnaHash: string, retriesLeft?: number): Promise<void>;
    renderContent(): import("lit-element").TemplateResult;
    renderErrorSnackbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    getScopedElements(): {
        'mwc-card': typeof Card;
        'mwc-button': typeof Button;
        'mwc-snackbar': typeof Snackbar;
        'mwc-list': typeof List;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list-item': typeof ListItem;
        'install-dna-dialog': {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
    };
}
