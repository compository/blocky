import { FabBase } from '@material/mwc-fab/mwc-fab-base';
import { Ripple } from './mwc-ripple';
declare const Fab_base: typeof FabBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Fab extends Fab_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
