import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { Ripple } from './mwc-ripple';
declare const ListItem_base: typeof ListItemBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class ListItem extends ListItem_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
