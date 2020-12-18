import { LitElement } from 'lit-element';
import { Dialog } from 'scoped-material-components/dist/mwc-dialog';
import { Button } from 'scoped-material-components/dist/mwc-button';
import { TextField } from 'scoped-material-components/dist/mwc-textfield';
declare const CompositoryInstallDnaDialog_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
} & import("lit-element").Constructor<import("holochain-membrane-context").MembraneContext>;
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
