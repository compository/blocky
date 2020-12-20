import { AdminWebsocket, AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor, property } from 'lit-element';
import { ConsumerMixin } from 'lit-element-context';

export interface MembraneContext {
  cellId?: CellId;
  appWebsocket?: AppWebsocket;
  adminWebsocket?: AdminWebsocket;
}

export const membraneContext = <T extends Constructor<HTMLElement>>(
  baseClass: T
): T & Constructor<{ membraneContext: MembraneContext }> => {
  class MembraneContextConsumer extends ConsumerMixin(baseClass) {
    @property({ type: Object })
    membraneContext!: MembraneContext;

    static get inject() {
      return ['membraneContext'];
    }
  }
  return (MembraneContextConsumer as unknown) as T &
    Constructor<{ membraneContext: MembraneContext }>;
};
