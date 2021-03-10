import { BaseElement } from '@holochain-open-dev/common';
import { Constructor } from 'lit-element';
import { CompositoryService } from '../services/compository-service';
export declare abstract class BaseCompositoryService extends BaseElement {
    abstract get _compositoryService(): CompositoryService;
}
declare type AbstractConstructor<T> = Function & {
    prototype: T;
};
export declare function connectService<T extends AbstractConstructor<BaseCompositoryService>>(baseClass: T, service: CompositoryService): Constructor<HTMLElement>;
export {};
