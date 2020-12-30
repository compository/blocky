import { Constructor, LitElement } from 'lit-element';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Button } from 'scoped-material-components/mwc-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { DnaFile } from 'bundle-dna';
declare const CompositoryInstallDnaDialog_base: Constructor<LitElement> & Constructor<{
    membraneContext: import("@holochain-open-dev/membrane-context").MembraneContext;
}>;
export declare class CompositoryInstallDnaDialog extends CompositoryInstallDnaDialog_base {
    dnaFile: DnaFile;
    _dialog: Dialog;
    _dnaPath: string;
    open(opened?: boolean): void;
    installDna(): Promise<void>;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-dialog': typeof Dialog;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
    };
    static get styles(): import("lit-element").CSSResult;
}
export {};
