import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { Ripple } from './mwc-ripple';
declare const Switch_base: typeof SwitchBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Switch extends Switch_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
}
export {};
