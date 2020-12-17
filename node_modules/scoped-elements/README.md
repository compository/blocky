# ScopedElementMixin

This is a very small mixin that imports the [`scoped-registries`](https://github.com/manolakis/scoped-registries/) polyfill and exposes an `scopedElements` function to override with the custom elements that should be registered inside the custom elements registry of the element.

## Usage

```ts
import { html, LitElement } from 'lit-element';
import { Scoped } from 'scoped-element-mixin';
import { MySubElement } from './my-sub-element';

export class MyElement extends Scoped(LitElement) {
  
  get scopedElements() {
    return {
      'my-sub-element': MySubElement,
    };
  }
  render() {
    return html`<my-sub-element></my-sub-element>`;
  }
}
```

Bear in mind, this mixin needs and already includes the polyfill.