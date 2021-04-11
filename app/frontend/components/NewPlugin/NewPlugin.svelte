<script lang="ts">
  import type { FormPlugin } from "../../types/types";
  import { newProjectStore } from "../../stores";
  import Input from "@components/NewInput/NewInput.svelte";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let plugin: FormPlugin;
  export let envId;
  export let pluginId;

  function deletePlugin() {
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

    dispatch("delete", {
      id: pluginId,
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

<div
  class={plugin.envBound ? "plugin" : "standalonePlugin"}
  in:fly={{ x: -500 }}
  out:fly={{ x: -500 }}
>
  <h3 on:click={() => deletePlugin()}>
    {plugin.name}
  </h3>
  <div class="inputs">
    {#each plugin.inputs as input, inputId}
      <Input {input} {pluginId} {envId} {inputId} envBound={plugin.envBound} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./newPlugin.scss";
</style>
