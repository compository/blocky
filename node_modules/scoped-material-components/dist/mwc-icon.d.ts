import { LitElement, TemplateResult } from 'lit-element';
declare const Icon_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Icon extends Icon_base {
    static styles: import("lit-element").CSSResult;
    /** @soyTemplate */
    protected render(): TemplateResult;
}
export {};
