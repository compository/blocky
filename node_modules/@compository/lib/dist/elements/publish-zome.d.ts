import { CompositoryService } from '../services/compository-service';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { BaseElement } from '@holochain-open-dev/common';
import { Card } from 'scoped-material-components/mwc-card';
import { Button } from 'scoped-material-components/mwc-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
export declare abstract class PublishZome extends BaseElement {
    _nameField: TextField;
    abstract get _compositoryService(): CompositoryService;
    _zomeWasmHash: string | undefined;
    _uiBundleHash: string | undefined;
    _invalidUiBundle: boolean;
    get publishDisabled(): boolean;
    publishZome(): Promise<void>;
    setUIBundleHash(file: File, hash: string): Promise<void>;
    renderErrorSnackbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-card': typeof Card;
        'mwc-snackbar': typeof Snackbar;
        'upload-files': any;
    };
    static get styles(): import("lit-element").CSSResult;
}
