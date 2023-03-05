import type { SvelteComponent } from "svelte";

export type TreeNode = { id: number; text: string; type?: string } & (TreeNodeItem | TreeNodeGroup);

export interface TreeNodeItem {
   icon?: typeof SvelteComponent;
   children?: never;
}

export interface TreeNodeGroup {
   icon?: never;
   children?: TreeNode[];
}
