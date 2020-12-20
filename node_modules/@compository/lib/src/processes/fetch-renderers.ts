import { serializeHash } from '@holochain-open-dev/common';
import { CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';
import { ZomeDef } from '../types/dnas';
import { ScopedRenderers } from '../types/scoped-renderers';
import { importModuleFromFile } from './import-module-from-file';

export async function fetchRenderersForZome(
  compositoryService: CompositoryService,
  cellId: CellId,
  zomeIndex: number
): Promise<[ZomeDef, ScopedRenderers?]> {
  const dnaHash = serializeHash(cellId[0]);

  const template = await compositoryService.getTemplateForDna(dnaHash);

  const zomeDefHash = template.dnaTemplate.zome_defs[zomeIndex].zome_def_hash;
  return internalFetchRenderersForZome(compositoryService, cellId, zomeDefHash);
}

export async function fetchRenderersForAllZomes(
  compositoryService: CompositoryService,
  cellId: CellId
): Promise<Array<[ZomeDef, ScopedRenderers?]>> {
  const dnaHash = serializeHash(cellId[0]);

  const template = await compositoryService.getTemplateForDna(dnaHash);

  const promises = template.dnaTemplate.zome_defs.map(zome_def =>
    internalFetchRenderersForZome(
      compositoryService,
      cellId,
      zome_def.zome_def_hash
    )
  );
  return await Promise.all(promises);
}

async function internalFetchRenderersForZome(
  compositoryService: CompositoryService,
  cellId: CellId,
  zomeDefHash: string
): Promise<[ZomeDef, ScopedRenderers?]> {
  // Fetch the appropriate elements bundle for this zome
  const zomeDef = await compositoryService.getZomeDef(zomeDefHash);

  if (!zomeDef.components_bundle_file) {
    return [zomeDef, undefined];
  }

  const file = await compositoryService.downloadFile(
    zomeDef.components_bundle_file
  );

  const module = await importModuleFromFile(file);
  const renderers = module.default as ScopedRenderers;
  return [zomeDef, renderers];
}
