import { CheckListItemBase } from '@material/mwc-list/mwc-check-list-item-base';
import { Checkbox } from './mwc-checkbox';
declare const CheckListItem_base: typeof CheckListItemBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class CheckListItem extends CheckListItem_base {
    static get scopedElements(): {
        'mwc-checkbox': typeof Checkbox;
    };
    static styles: import("lit-element").CSSResult[];
}
export {};
