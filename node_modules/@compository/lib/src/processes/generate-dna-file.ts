import { bundle_dna, DnaFile } from 'bundle-dna';
import { CompositoryService } from '../services/compository-service';
import { DnaTemplate, ZomeDef, ZomeDefReference } from '../types/dnas';

export async function generateDnaFile(
  compositoryService: CompositoryService,
  dnaTemplate: DnaTemplate,
  uuid: string,
  properties: any
): Promise<DnaFile> {
  // Fetch all zomes for that template
  const promises = dnaTemplate.zome_defs.map(async zome_def =>
    fetchZome(compositoryService, zome_def.zome_def_hash)
  );
  const zomes = await Promise.all(promises);

  // Prepare the arguments
  const argZomes = zomes.map(zome => [
    zome.zomeDef.name,
    { wasm_hash: Array.from(zome.zomeDef.wasm_hash) },
  ]);
  const codesPromises = zomes.map(zome => zome.file.arrayBuffer());
  const codes = await Promise.all(codesPromises);

  // Bundle the dna
  const dnaFile = await bundle_dna(
    dnaTemplate.name,
    uuid,
    properties,
    argZomes,
    codes.map(code => ({ code: Array.from(new Uint8Array(code)) }))
  );

  return dnaFile;
}

async function fetchZome(
  compositoryService: CompositoryService,
  zomeDefHash: string
): Promise<{ zomeDef: ZomeDef; file: File }> {
  const zomeDef = await compositoryService.getZomeDef(zomeDefHash);

  const file = await compositoryService.downloadFile(zomeDef.wasm_file);
  return { zomeDef, file };
}
