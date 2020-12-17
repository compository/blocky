import './tslib.es6-2abbead4.js';
import './ripple-handlers-a617bd83.js';
import 'lit-element';
import 'lit-html/directives/class-map';
import { Scoped } from 'scoped-elements';
import './base-element-66082abe.js';
import './foundation-9806e19c.js';
import { Ripple } from './mwc-ripple.js';
import 'lit-html/directives/style-map';
import './observer-c2e992b9.js';
import { L as ListItemBase, s as style } from './mwc-list-item-css-3c8c3d4c.js';

class ListItem extends Scoped(ListItemBase) {
    static get scopedElements() {
        return {
            'mwc-ripple': Ripple,
        };
    }
}
ListItem.styles = style;

export { ListItem };
//# sourceMappingURL=mwc-list-item.js.map
