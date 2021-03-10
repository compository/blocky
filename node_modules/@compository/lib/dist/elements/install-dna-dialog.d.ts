import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Button } from 'scoped-material-components/mwc-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { DnaBundle } from '@holochain/conductor-api';
import { BaseCompositoryService } from './base';
export declare abstract class InstallDnaDialog extends BaseCompositoryService {
    dnaBundle: DnaBundle;
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
