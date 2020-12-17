import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { Icon } from './mwc-icon';
import { Ripple } from './mwc-ripple';
declare const Button_base: typeof ButtonBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Button extends Button_base {
    static get scopedElements(): {
        'mwc-icon': typeof Icon;
        'mwc-ripple': typeof Ripple;
    };
    ripple: Promise<Ripple | null>;
    static styles: import("lit-element").CSSResult;
}
export {};
