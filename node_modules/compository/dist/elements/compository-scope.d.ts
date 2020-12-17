import { LitElement } from 'lit-element';
declare const CompositoryScope_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class CompositoryScope extends CompositoryScope_base {
    render(): import("lit-element").TemplateResult;
}
export {};
