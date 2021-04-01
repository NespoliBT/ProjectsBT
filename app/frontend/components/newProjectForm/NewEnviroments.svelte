<script lang="ts">
  import type { FormPlugin } from "../../types/types";
  import NewPlugin from "./NewPlugin.svelte";
  import { fly } from "svelte/transition";
  import { newProjectStore } from "../../stores";

  let selectedEnv = -1;
  let enviroments: { name: string; plugins: FormPlugin[] }[] = [];
  let standalonePlugins: FormPlugin[] = [];

  export function addPlugin(plugin: FormPlugin) {
    if (!plugin.envBound) {
      standalonePlugins = [...standalonePlugins, plugin];
    } else {
      if (selectedEnv !== -1) {
        enviroments[selectedEnv].plugins = [
          ...enviroments[selectedEnv].plugins,
          plugin,
        ];
      } else {
        enviroments = [
          ...enviroments,
          {
            name: "",
            plugins: [plugin],
          },
        ];
        selectedEnv = 0;

        newProjectStore.update((state) => {
          state.enviroments = [
            {
              name: "",
              plugins: [],
            },
          ];
          return state;
        });
      }
    }
  }

  function addEnv() {
    if (selectedEnv === -1) {
      selectedEnv = 0;
    } else {
      selectedEnv = enviroments.length - 1;
    }

    enviroments = [
      ...enviroments,
      {
        name: "",
        plugins: [],
      },
    ];

    newProjectStore.update((state) => {
      state.enviroments = [
        ...state.enviroments,
        {
          name: "",
          plugins: [],
        },
      ];
      return state;
    });
  }

  function deleteEnv(id: number) {
    newProjectStore.update((state) => {
      state.enviroments = state.enviroments.filter((e, i) => i != id);
      enviroments = enviroments.filter((e, i) => i != id);
      return state;
    });

    selectedEnv = enviroments.length - 1;
  }

  function setEnvName(envId: number) {
    newProjectStore.update((state) => {
      state.enviroments[envId].name = enviroments[envId].name;
      return state;
    });
  }
</script>

{#each enviroments as enviroment, envId}
  <div
    class="enviroment"
    on:mouseenter={() => (selectedEnv = envId)}
    in:fly={{ x: -500 }}
    out:fly={{ x: -500 }}
  >
    <div class="header">
      <input
        type="text"
        class="name"
        bind:value={enviroments[envId].name}
        on:input={() => setEnvName(envId)}
        placeholder="Nome Enviroment"
      />
      <div class="delete" on:click={() => deleteEnv(envId)}></div>
    </div>
    {#each enviroment.plugins as plugin, pluginId}
      <NewPlugin {plugin} {envId} {pluginId} />
    {/each}
  </div>
{/each}
{#each standalonePlugins as plugin, pluginId}
  <div class="standalonePlugins">
    <NewPlugin {plugin} {pluginId} />
  </div>
{/each}
<div class="newEnviroment" on:click={() => addEnv()}></div>

<style lang="scss">
  @import "./scss/newEnviroments.scss";
</style>
