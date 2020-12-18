import { LitElement } from 'lit-element';
import { CompositoryScope } from './compository-scope';
declare const CompositoryDiscoverEntry_base: typeof LitElement & import("lit-element").Constructor<import("holochain-membrane-context").MembraneContext>;
export declare class CompositoryDiscoverEntry extends CompositoryDiscoverEntry_base {
    entryUri: string;
    _loading: boolean;
    _scope: CompositoryScope;
    firstUpdated(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
