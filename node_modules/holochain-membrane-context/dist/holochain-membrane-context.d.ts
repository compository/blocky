import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
declare const HolochainMembraneContext_base: any;
export declare class HolochainMembraneContext extends HolochainMembraneContext_base {
    static get providedContexts(): {
        membrane: {
            cellId: null;
            appWebsocket: null;
            adminWebsocket: null;
        };
    };
    connectedCallback(): void;
    cellId: CellId;
    appWebsocket: AppWebsocket;
    adminWebsocket: AdminWebsocket;
    updated(): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
export {};
