import type { Select as S } from '@material/mwc-select';
import { Icon } from './mwc-icon';
import { Menu } from './mwc-menu';
import { NotchedOutline } from './mwc-notched-outline';
import { Constructor } from 'lit-element';
declare const Select_base: Constructor<S> & Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class Select extends Select_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-notched-outline': typeof NotchedOutline;
        'mwc-menu': typeof Menu;
        'mwc-icon': typeof Icon;
    };
}
export {};
