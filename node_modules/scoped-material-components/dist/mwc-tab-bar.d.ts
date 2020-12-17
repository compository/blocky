import { TabBarBase } from '@material/mwc-tab-bar/mwc-tab-bar-base';
import { Tab } from './mwc-tab';
import { TabScroller } from './mwc-tab-scroller';
declare const TabBar_base: typeof TabBarBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class TabBar extends TabBar_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-tab': typeof Tab;
        'mwc-tab-scroller': typeof TabScroller;
    };
}
export {};
