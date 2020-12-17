import { IconButtonBase } from '@material/mwc-icon-button/mwc-icon-button-base';
import { Ripple } from './mwc-ripple';
declare const IconButton_base: typeof IconButtonBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class IconButton extends IconButton_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
}
export {};
