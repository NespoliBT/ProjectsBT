<script lang="ts">
  import type { FormPlugin } from "../../types/types";
  import { newProjectStore } from "../../stores";
  import NewInput from "@components/NewInput/NewInput.svelte";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let plugin: FormPlugin;
  export let envId = 0;
  export let pluginId;
  let openGitlab = false;
  let openGitHub = false;

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

{#if plugin.name == "Git"}
  {#if !(openGitlab || openGitHub)}
    <div class="flavourBox" in:fly={{ x: -500 }} out:fly={{ x: -500 }}>
      <div
        class="flavour"
        on:click={() => {
          openGitlab = true;
        }}
      >
        
      </div>
      <div
        class="flavour"
        on:click={() => {
          openGitHub = true;
        }}
      >
        
      </div>
    </div>
  {/if}
  {#if openGitlab || openGitHub}
    <div
      class="plugin standalonePlugin"
      in:fly={{ x: -500 }}
      out:fly={{ x: -500 }}
    >
      <h3 on:click={() => deletePlugin()}>
        {openGitlab ? "GitLab" : "GitHub"}
      </h3>
      <div class="inputs">
        <NewInput
          input={plugin.inputs[0]}
          {pluginId}
          {envId}
          inputId={0}
          envBound={plugin.envBound}
        />
        {#if openGitlab}
          <NewInput
            input={plugin.inputs[1]}
            {pluginId}
            {envId}
            inputId={1}
            envBound={plugin.envBound}
          />
        {/if}
      </div>
    </div>
  {/if}
{:else}
  <div class="plugin" in:fly={{ x: -500 }} out:fly={{ x: -500 }}>
    <h3 on:click={() => deletePlugin()}>
      {plugin.name}
    </h3>
    <div class="inputs">
      {#each plugin.inputs as input, inputId}
        <NewInput
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
  @import "./newPlugin.scss";
</style>
