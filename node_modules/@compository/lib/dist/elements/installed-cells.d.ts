import { Dictionary } from '@holochain-open-dev/core-types';
import { CellId } from '@holochain/conductor-api';
import { Card } from 'scoped-material-components/mwc-card';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { BaseCompositoryService } from './base';
export declare abstract class InstalledCells extends BaseCompositoryService {
    _installedCellIds: Array<CellId>;
    _dnaTemplateNames: Dictionary<string>;
    firstUpdated(): void;
    get compositoryDnaHash(): string;
    loadCellsIds(): Promise<void>;
    fetchDnaTemplateNames(instantiatedDnaHashes: string[]): Promise<Dictionary<string>>;
    getNonCompositoryCellIds(): CellId[];
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-card': typeof Card;
        'mwc-circular-progress': typeof CircularProgress;
    };
}
