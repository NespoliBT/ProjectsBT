<script lang="ts">
  import type { PluginT } from "../../types/types";
  import Input from "@components/Input/Input.svelte";
  export let plugin: PluginT;
</script>

<div class="plugin">
  <div class="name">{plugin.name}</div>
  <div class="inputs">
    {#each plugin.inputs as input}
      <Input {input} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./plugin.scss";
</style>
