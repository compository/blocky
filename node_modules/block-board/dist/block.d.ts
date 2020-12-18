export interface Block {
    name: string;
    render: (root: ShadowRoot, registry: CustomElementRegistry) => void;
}
export interface BlockSet {
    name: string;
    blocks: Block[];
}
export interface BlockLayoutNode {
    direction: "vertical" | "horizontal";
    slots: [BlockSlot, BlockSlot];
    firstSlotRelativeSize: number;
}
export declare type BlockSlot = string | undefined | BlockLayoutNode;
