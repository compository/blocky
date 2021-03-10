import { BaseElement } from '@holochain-open-dev/common';
export class BaseCompositoryService extends BaseElement {
}
export function connectService(baseClass, service) {
    return class extends baseClass {
        get _compositoryService() {
            return service;
        }
    };
}
//# sourceMappingURL=base.js.map