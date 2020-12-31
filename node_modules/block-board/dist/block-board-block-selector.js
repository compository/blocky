import { __decorate } from "tslib";
import { LitElement, html, property } from "lit-element";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { ListItem } from "scoped-material-components/mwc-list-item";
import { List } from "scoped-material-components/mwc-list";
import { sharedStyles } from "./sharedStyles";
export class BlockBoardBlockSelector extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.blockSets = [];
    }
    onDragStart(e, block) {
        var _a;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("blockName", block.name);
    }
    renderBlockSet(set) {
        return html `
      <div class="column" style="margin: 8px;">
        <span style="margin-bottom: 4px; font-weight: bold;">${set.name}</span>
        <mwc-list class="column">
          ${set.blocks.map((block) => html ` <mwc-list-item
                draggable="true"
                @dragstart=${(e) => this.onDragStart(e, block)}
                >${block.name}
              </mwc-list-item>`)}
        </mwc-list>
      </div>
    `;
    }
    render() {
        return html `
      <div class="column">
        ${this.blockSets.map((set) => this.renderBlockSet(set))}
      </div>
    `;
    }
    static get scopedElements() {
        return {
            "mwc-list": List,
            "mwc-list-item": ListItem,
        };
    }
}
BlockBoardBlockSelector.styles = sharedStyles;
__decorate([
    property({ type: Array })
], BlockBoardBlockSelector.prototype, "blockSets", void 0);
//# sourceMappingURL=block-board-block-selector.js.map