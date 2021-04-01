<script lang="ts">
  import type { Enviroment } from "../../types/types";
  export let enviroment: Enviroment;

  import PluginC from "./PluginC.svelte";
</script>

<div class="enviroment">
  <div class="name">{enviroment.name}</div>
  <div class="plugins">
    {#each enviroment.plugins as plugin}
      <PluginC {plugin} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./scss/enviroment.scss";
</style>
