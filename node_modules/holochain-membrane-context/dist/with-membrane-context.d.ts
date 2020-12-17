/// <reference types="mocha" />
import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor, LitElement } from 'lit-element';
export interface MembraneContext {
    cellId: CellId;
    appWebsocket: AppWebsocket;
    adminWebsocket: AdminWebsocket;
}
export declare const membraneContext: <T extends Constructor<LitElement>>(baseClass: T) => T & Constructor<{
    context: {
        membrane: MembraneContext;
    };
    cellId: CellId;
    appWebsocket: AppWebsocket;
    adminWebsocket: AdminWebsocket;
}>;
