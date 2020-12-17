import { TabBase } from '@material/mwc-tab/mwc-tab-base';
import { Ripple } from './mwc-ripple';
import { TabIndicator } from './mwc-tab-indicator';
declare const Tab_base: typeof TabBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Tab extends Tab_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-tab-indicator': typeof TabIndicator;
        'mwc-ripple': typeof Ripple;
    };
}
export {};
