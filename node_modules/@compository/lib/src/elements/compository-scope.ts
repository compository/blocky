import { html, LitElement, Constructor } from 'lit-element';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';

export class CompositoryScope extends (Scoped(
  LitElement
) as Constructor<LitElement>) {
  render() {
    return html``;
  }
}
