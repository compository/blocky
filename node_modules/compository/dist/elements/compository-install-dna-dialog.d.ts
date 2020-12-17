import { LitElement } from 'lit-element';
import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';
import { TextField } from '@material/mwc-textfield';
declare const CompositoryInstallDnaDialog_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
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
export declare class CompositoryInstallDnaDialog extends CompositoryInstallDnaDialog_base {
    _dialog: Dialog;
    _dnaPath: string;
    static get scopedElements(): {
        'mwc-dialog': typeof Dialog;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
    };
    open(opened?: boolean): void;
    installDna(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
export {};
