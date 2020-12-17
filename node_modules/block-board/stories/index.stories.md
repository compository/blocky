```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/block-board.js';

export default {
  title: 'Blockboard',
  component: 'block-board',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# Blockboard

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add block-board
```

```js
import 'block-board/block-board.js';
```

```js preview-story
export const Simple = () => html`
  <block-board></block-board>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <block-board title="Hello World"></block-board>
`;
```
