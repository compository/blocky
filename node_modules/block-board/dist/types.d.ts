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
    slots: [BlockNode, BlockNode];
    firstSlotRelativeSize: number;
}
export declare type BlockNode = string | undefined | BlockLayout;
