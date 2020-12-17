import { RadioListItemBase } from '@material/mwc-list/mwc-radio-list-item-base';
import { Radio } from './mwc-radio';
declare const RadioListItem_base: typeof RadioListItemBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class RadioListItem extends RadioListItem_base {
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-radio': typeof Radio;
    };
}
export {};
