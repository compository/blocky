import type { TextField as T } from '@material/mwc-textfield';
import { Constructor } from 'lit-element';
import { NotchedOutline } from './mwc-notched-outline';
declare const TextField_base: Constructor<T> & Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class TextField extends TextField_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-notched-outline': typeof NotchedOutline;
    };
}
export {};
