<script lang="ts">
  import type { Plugin } from "../../types/types";
  import InputC from "./InputC.svelte";
  export let plugin: Plugin;
</script>

<div class="plugin">
  <div class="name">{plugin.name}</div>
  <div class="inputs">
    {#each plugin.inputs as input}
      <InputC {input} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./scss/plugin.scss";
</style>
