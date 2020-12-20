// For now, we assume that properties and uuid is empty
export async function createDnaTemplate(compositoryService, zomeDefs) {
    const zomeDefReferences = zomeDefs.map(def => ({
        name: def.content.name,
        zome_def_hash: def.hash,
    }));
    const dnaTemplate = {
        name: 'adf',
        zome_defs: zomeDefReferences,
    };
    return compositoryService.publishDnaTemplate(dnaTemplate);
}
//# sourceMappingURL=dna-template.js.map