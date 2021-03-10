import { CompositoryScope } from './compository-scope';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { BaseCompositoryService } from './base';
export declare abstract class DiscoverEntry extends BaseCompositoryService {
    entryUri: string;
    _loading: boolean;
    _scope: CompositoryScope;
    loadRenderers(): Promise<void>;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
    };
}
