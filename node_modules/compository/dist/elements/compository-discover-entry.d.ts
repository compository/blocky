import { LitElement } from 'lit-element';
import { CompositoryScope } from './compository-scope';
declare const CompositoryDiscoverEntry_base: typeof LitElement & import("lit-element").Constructor<{
    context: {
        membrane: import("holochain-membrane-context").MembraneContext;
    };
    cellId: import("@holochain/conductor-api").CellId;
    appWebsocket: import("@holochain/conductor-api").AppWebsocket;
    adminWebsocket: import("@holochain/conductor-api").AdminWebsocket;
}>;
export declare class CompositoryDiscoverEntry extends CompositoryDiscoverEntry_base {
    entryUri: string;
    _loading: boolean;
    _scope: CompositoryScope;
    firstUpdated(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
