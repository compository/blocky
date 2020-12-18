/**
 * Receive DNA_HASH://ENTRY_HASH
 *
 * 1. Instantiate discover element
 * 2. Element checks if we have the cell-id installed with AdminWebsocket
 *  2.1. If we don't, go to the compository DNA and fetch the new dna
 *  2.2. Install the dna using the AdminWebsocket
 * 3. Fetch the entry with details
 * 4. Figure out which zome and entry def index is the entry
 * 5. Go fetch the js module for the zome if we don't have it in cache
 * 6. Declare the elements in the discover element ScopedCustomElementsRegistry
 * 7. Instantiate the element with the entry_id
 */
/**
 * Stitching zomes
 * 1. Get all zomes
 * 2. Select the zomes you want to combine -> blocky and common mandatory for now
 * 3. Get the files from compository
 * 4. Bundle the dna together -> properties? zome_wasms as properties?
 * 5. Download dna
 * 6. Install the dna with the conductor admin
 * 7. ???? connect to the UI with blocky as frame
 * 8. Blocky asks you to create first board using block-board
 */
/**
 * Blocky:
 *
 * 0. List all installed apps with the AdminWebsocket
 * 1. Given an app id and an appwebsocket
 * 2. Get all the elements for all dnas->zomes from the compository
 *  2.1 Fetch the js modules from cache
 * 3. Declare them in the block-board ScopedCustomElementsRegistry
 * 4. If we have a layout already saved, load it
 * 5. If layout is edited, save layout
 *
 * List of happs you can bring in
 *
 */
export * from './elements/compository-discover-entry';
export * from './elements/compository-scope';
export * from './elements/compository-install-dna-dialog';
export * from './services/compository-service';
export * from './types/scoped-renderers';
export * from './types/dnas';
export * from './processes/discover';
export * from './processes/download-file';
export * from './processes/dna-template';
export * from './processes/fetch-renderers';
export * from './processes/generate-dna';
//# sourceMappingURL=index.js.map