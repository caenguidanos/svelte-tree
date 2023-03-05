<script lang="ts">
   import { writable } from "svelte/store";
   import TreeIconGroupClosed from "./TreeIconGroupClosed.svelte";
   import type { TreeNode } from "./Tree.types";
   import TreeIconFolderOpen from "./TreeIconFolderOpen.svelte";
   import TreeIconFolder from "./TreeIconFolder.svelte";
   import TreeIconFile from "./TreeIconFile.svelte";

   export let src: TreeNode[] = [];
   export let opened: TreeNode["id"][] = [];

   let opened_nodes = writable<TreeNode["id"][]>(opened);

   function toggle_opened_node(id: TreeNode["id"]) {
      if ($opened_nodes.includes(id)) {
         opened_nodes.update((state) => state.filter((_id) => _id !== id));
      } else {
         opened_nodes.update((state) => [...state, id]);
      }
   }
</script>

<ul>
   {#each src as tree_item}
      {#if tree_item.children}
         <li class="tree-item-group" data-open={$opened_nodes.includes(tree_item.id)}>
            <div class="tree-item-container">
               <button on:click={() => toggle_opened_node(tree_item.id)}>
                  <TreeIconGroupClosed />
               </button>

               <div class="tree-item-container-label">
                  {#if $opened_nodes.includes(tree_item.id)}
                     <span class="tree-item-group-icon">
                        <TreeIconFolderOpen />
                     </span>
                  {:else}
                     <span class="tree-item-group-icon">
                        <TreeIconFolder />
                     </span>
                  {/if}

                  <span>{tree_item.text}</span>
               </div>
            </div>

            {#if $opened_nodes.includes(tree_item.id)}
               <svelte:self src={tree_item.children} />
            {/if}
         </li>
      {:else}
         <li class="tree-item-single">
            <div class="tree-item-container">
               {#if tree_item.icon}
                  <span>
                     <svelte:component this={tree_item.icon} />
                  </span>
               {:else}
                  <span>
                     <TreeIconFile />
                  </span>
               {/if}

               <div>
                  <span>{tree_item.text}</span>
                  {#if tree_item.type}
                     <span class="tree-item-type">{tree_item.type}</span>
                  {/if}
               </div>
            </div>
         </li>
      {/if}
   {/each}
</ul>

<style>
   :global(li) {
      color: var(--tree-color);
   }

   :global(button) {
      font-family: inherit;
      font-size: 100%;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;
      margin: 0;
      padding: 0;
      text-transform: none;
      -webkit-appearance: button;
      background-color: transparent;
      background-image: none;
      cursor: pointer;
   }

   :global(::-webkit-inner-spin-button, ::-webkit-outer-spin-button) {
      height: auto;
   }

   :global(::-webkit-file-upload-button) {
      -webkit-appearance: button;
      font: inherit;
   }

   :global(ul) {
      list-style: none;
      margin: 0;
      padding: 0;
   }

   :global(*, ::before, ::after) {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
   }

   .tree-item-single {
      padding-left: 1.3rem;
   }

   .tree-item-single > .tree-item-container {
      display: flex;
      align-items: center;
      flex: 1;
      min-height: 2rem;
      padding-left: 20px;
      gap: 0.5rem;
   }

   .tree-item-group {
      padding-left: 1rem;
   }

   .tree-item-group > .tree-item-container {
      display: flex;
      align-items: center;
      flex: 1;
      min-height: 2rem;
   }

   .tree-item-group > .tree-item-container > button {
      display: flex;
      align-items: center;
      margin-right: 0.3rem;
      cursor: pointer;
      transition: all 150ms ease-in-out;
   }

   .tree-item-group[data-open="true"] > .tree-item-container > button {
      transform: rotate(90deg);
   }

   @media (prefers-reduced-motion: reduce) {
      .tree-item-group > .tree-item-container > button {
         transition: none;
      }
   }

   .tree-item-group > .tree-item-container > .tree-item-container-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
   }

   .tree-item-type {
      color: var(--tree-type-color);
   }

   .tree-item-group-icon {
      color: var(--tree-group-icon-color);
   }
</style>
