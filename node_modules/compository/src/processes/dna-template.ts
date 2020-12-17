import { CompositoryService } from '../services/compository-service';
import { DnaTemplate, Hashed, ZomeDef, ZomeDefReference } from '../types/dnas';

// For now, we assume that properties and uuid is empty
export async function createDnaTemplate(
  compositoryService: CompositoryService,
  zomeDefs: Array<Hashed<ZomeDef>>
): Promise<string> {
  const zomeDefReferences: Array<ZomeDefReference> = zomeDefs.map(def => ({
    name: def.content.name,
    zome_def_hash: def.hash,
  }));
  const dnaTemplate: DnaTemplate = {
    name: 'adf',
    zome_defs: zomeDefReferences,
  };

  return compositoryService.publishDnaTemplate(dnaTemplate);
}
