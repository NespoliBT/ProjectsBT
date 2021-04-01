<script lang="ts">
  import type { FormPlugin } from "../../types/types";
  import { newProjectStore } from "../../stores";
  import Input from "./Input.svelte";
  import { fly } from "svelte/transition";

  export let plugin: FormPlugin;
  export let envId;
  export let pluginId;

  export let deleted = false;

  function deletePlugin() {
    deleted = true;
    newProjectStore.update((state) => {
      if (!plugin.envBound) {
        state.standalonePlugins = state.standalonePlugins.filter(
          (p, i) => i != pluginId
        );
      } else {
        state.enviroments[envId].plugins = state.enviroments[
          envId
        ].plugins.filter((p, i) => i != pluginId);
      }

      return state;
    });
  }

  newProjectStore.update((state) => {
    if (!plugin.envBound) {
      state.standalonePlugins = [
        ...state.standalonePlugins,
        {
          name: plugin.name,
          inputs: [],
        },
      ];
    } else {
      state.enviroments[envId].plugins = [
        ...state.enviroments[envId].plugins,
        {
          name: plugin.name,
          inputs: [],
        },
      ];
    }
    return state;
  });
</script>

{#if !deleted}
  <div
    class={plugin.envBound ? "plugin" : "standalonePlugin"}
    in:fly={{ x: -500 }}
  >
    <h3 on:click={() => deletePlugin()}>
      {plugin.name}
    </h3>
    <div class="inputs">
      {#each plugin.inputs as input, inputId}
        <Input
          {input}
          {pluginId}
          {envId}
          {inputId}
          envBound={plugin.envBound}
        />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./scss/newPlugin.scss";
</style>
