import { CompositoryService } from './services/compository-service';

export const setupElement = (
  baseClass: any,
  compositoryService: CompositoryService
): typeof HTMLElement =>
  class extends baseClass {
    get _compositoryService() {
      return compositoryService;
    }
  } as any as typeof HTMLElement;
