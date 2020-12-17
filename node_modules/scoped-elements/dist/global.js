export function defineGlobalElements(elements) {
    for (const tag of Object.keys(elements)) {
        const element = elements[tag];
        if (element.scopedElements) {
            defineGlobalElements(element.scopedElements);
        }
        const existingElement = window.customElements.get(tag);
        if (existingElement !== elements[tag])
            throw new Error("Trying to redefine already existing element with a different class: try scoping the elements");
        window.customElements.define(tag, elements[tag]);
    }
}
//# sourceMappingURL=global.js.map