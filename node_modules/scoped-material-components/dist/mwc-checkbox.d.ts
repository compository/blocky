import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { Ripple } from './mwc-ripple';
declare const Checkbox_base: typeof CheckboxBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Checkbox extends Checkbox_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
