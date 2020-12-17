import { Constructor } from "lit-element";
import { Dictionary, ScopedElementConstructor } from "./types";
declare global {
    interface HTMLElement {
        connectedCallback?(): void;
    }
}
export declare const Scoped: <T extends Constructor<HTMLElement>>(baseClass: T) => T & Constructor<HTMLElement> & {
    readonly scopedElements: Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
