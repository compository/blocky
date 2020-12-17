import { Constructor } from "lit-element";
export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type ScopedElementConstructor = Constructor<HTMLElement> & {
    readonly scopedElements: Dictionary<typeof HTMLElement>;
};
