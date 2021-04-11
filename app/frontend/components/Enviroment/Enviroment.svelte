<script lang="ts">
  import type { EnviromentT } from "../../types/types";
  export let enviroment: EnviromentT;

  import Plugin from "@components/Plugin/Plugin.svelte";
</script>

<div class="enviroment">
  <div class="name">{enviroment.name}</div>
  <div class="plugins">
    {#each enviroment.plugins as plugin}
      <Plugin {plugin} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./enviroment.scss";
</style>
