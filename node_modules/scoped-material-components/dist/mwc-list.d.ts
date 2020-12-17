import type { List as L } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Constructor } from 'lit-element';
declare const List_base: Constructor<L> & Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class List extends List_base {
    static get scopedElements(): {
        'mwc-list-item': typeof ListItem;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
