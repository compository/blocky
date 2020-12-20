import { Constructor, LitElement, PropertyValues } from 'lit-element';
import { CompositoryScope } from './compository-scope';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
declare const CompositoryDiscoverEntry_base: Constructor<LitElement> & Constructor<{
    membraneContext: import("@holochain-open-dev/membrane-context").MembraneContext;
}>;
export declare class CompositoryDiscoverEntry extends CompositoryDiscoverEntry_base {
    entryUri: string;
    _loading: boolean;
    _scope: CompositoryScope;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
    };
    updated(changed: PropertyValues): void;
    loadRenderers(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
