<script lang="ts">
   import Tree from "./lib/Tree.svelte";

   import type { TreeNode } from "./lib/Tree.types";

   let opened = [1, 9];

   let src: TreeNode[] = [
      { id: 0, text: "AI / Machine learning", type: "pdf" },
      {
         id: 1,
         text: "Analytics",
         children: [
            {
               id: 2,
               text: "IBM Analytics Engine",
               children: [
                  { id: 3, text: "Apache Spark" },
                  { id: 4, text: "Hadoop" },
               ],
            },
            { id: 5, text: "IBM Cloud SQL Query", type: "mp4" },
            { id: 6, text: "IBM Db2 Warehouse on Cloud" },
         ],
      },
      {
         id: 7,
         text: "Blockchain",
         children: [{ id: 8, text: "IBM Blockchain Platform" }],
      },
      {
         id: 9,
         text: "Databases",
         children: [
            { id: 10, text: "IBM Cloud Databases for Elasticsearch" },
            { id: 11, text: "IBM Cloud Databases for Enterprise DB" },
            { id: 12, text: "IBM Cloud Databases for MongoDB" },
            { id: 13, text: "IBM Cloud Databases for PostgreSQL" },
         ],
      },
      {
         id: 14,
         text: "Integration",
         children: [{ id: 15, text: "IBM API Connect" }],
      },
   ];
</script>

<main>
   <Tree {src} {opened} />
</main>

<style>
   :global(html) {
      --tree-color: #1e293b;
      --tree-type-color: #475569;
      --tree-group-icon-color: #475569;
      font-family: "Inter", sans-serif;
   }
</style>
