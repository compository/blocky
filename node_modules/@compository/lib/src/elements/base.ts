import { BaseElement } from '@holochain-open-dev/common';
import { Constructor } from 'lit-element';
import { CompositoryService } from '../services/compository-service';

export abstract class BaseCompositoryService extends BaseElement {
  abstract get _compositoryService(): CompositoryService;
}

type AbstractConstructor<T> = Function & { prototype: T };

export function connectService<
  T extends AbstractConstructor<BaseCompositoryService>
>(baseClass: T, service: CompositoryService): Constructor<HTMLElement> {
  return class extends ((baseClass as unknown) as typeof HTMLElement) {
    get _compositoryService(): CompositoryService {
      return service;
    }
  };
}
