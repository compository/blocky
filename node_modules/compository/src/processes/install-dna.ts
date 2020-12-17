import { AdminWebsocket, CellId } from '@holochain/conductor-api';
import { CompositoryService } from '../services/compository-service';

export async function fetchDna(
  adminWebsocket: AdminWebsocket,
  compositoryService: CompositoryService,
  dnaHash: string
): Promise<CellId> {
  const template = await compositoryService.getTemplateForDna(dnaHash);

  // TODO
  return [[], []] as any;
}

export async function installDna(
  adminWebsocket: AdminWebsocket,
  compositoryService: CompositoryService,
  dnaHash: string
): Promise<CellId> {
  const template = await compositoryService.getTemplateForDna(dnaHash);

  // TODO
  return [[], []] as any;
}
