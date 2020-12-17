import { RippleBase } from '@material/mwc-ripple/mwc-ripple-base';
declare const Ripple_base: typeof RippleBase & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Ripple extends Ripple_base {
    static styles: import("lit-element").CSSResult;
}
export {};
