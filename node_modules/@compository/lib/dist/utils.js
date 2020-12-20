export const setupElement = (baseClass, compositoryService) => class extends baseClass {
    get _compositoryService() {
        return compositoryService;
    }
};
//# sourceMappingURL=utils.js.map