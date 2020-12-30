export interface Block {
  name: string;

  render: (root: ShadowRoot) => void;
}

export interface BlockSet {
  name: string;
  blocks: Block[];
}

export interface BlockLayout {
  direction: "vertical" | "horizontal";
  slots: [BlockNode, BlockNode]; // if it's a string, it's the block name, if it's undefined, a void block slot
  firstSlotRelativeSize: number;
}

export type BlockNode = string | undefined | BlockLayout;
