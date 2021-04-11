<script lang="ts">
  import type { PluginT } from "../../types/types";
  import Git from "./Git/Git.svelte";

  export let plugin: PluginT;
</script>

{#if plugin.name === "Git"}
  <Git inputs={plugin.inputs} />
{:else if plugin.name === "Doc"}
  <p>Doc</p>
{:else}
  <p>Altro</p>
{/if}
