import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import { withContext } from 'wc-context';
export class HolochainMembraneContext extends withContext(LitElement) {
    static get providedContexts() {
        return {
            membrane: {
                cellId: null,
                appWebsocket: null,
                adminWebsocket: null,
            },
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateProvidedContext('membrane', {
            cellId: this.cellId,
            appWebsocket: this.appWebsocket,
            adminWebsocket: this.adminWebsocket,
        });
    }
    updated() {
        super.updated();
        this.updateProvidedContext('membrane', {
            cellId: this.cellId,
            appWebsocket: this.appWebsocket,
            adminWebsocket: this.adminWebsocket,
        });
    }
    static get styles() {
        return css `
      :host {
        display: contents;
      }
    `;
    }
    render() {
        return html `<slot></slot>`;
    }
}
__decorate([
    property({ type: Array })
], HolochainMembraneContext.prototype, "cellId", void 0);
__decorate([
    property({ type: Object })
], HolochainMembraneContext.prototype, "appWebsocket", void 0);
__decorate([
    property({ type: Object })
], HolochainMembraneContext.prototype, "adminWebsocket", void 0);
//# sourceMappingURL=holochain-membrane-context.js.map