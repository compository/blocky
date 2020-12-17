import { AppWebsocket, CellId } from '@holochain/conductor-api';

export class BlockyService {
  constructor(public appWebsocket: AppWebsocket, public cellId: CellId) {}
}
