<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { projectService } from "../../services/projectService";
  import type { ProjectT } from "../../types/types";
  import Enviroment from "@components/Enviroment/Enviroment.svelte";
  import StandalonePlugins from "@components/StandalonePlugins/StandalonePlugins.svelte";
  import { projectsStore } from "../../stores";
  export let project: ProjectT;
  let infoOpen = false;
  let openRemovePopup;

  function removeProject() {
    projectService.removeProject(project.id);

    infoOpen = false;
    openRemovePopup = false;

    projectsStore.update(
      (state) => (state = state.filter((proj) => proj !== project))
    );
  }

  function toggleInfo(value: boolean) {
    infoOpen = value;
  }
</script>

<div
  class="project"
  tabindex="0"
  in:scale={{ duration: 500 }}
  out:scale={{ duration: 500 }}
>
  <div class="header" on:click={() => toggleInfo(true)}>
    <div class="name">{project.name}</div>
    <div class="technology">{project.technology}</div>
  </div>
  <div class="description">{project.description}</div>
</div>

{#if infoOpen}
  <div class="projectInfoOverlay" in:fly={{ x: -500 }} out:fly={{ x: -500 }}>
    <div class="projectInfo">
      <div class="left">
        <div class="projectName">{project.name}</div>
        <div class="projectTechnology">{project.technology}</div>
        <div class="projectDescription">{project.description}</div>
        <div class="actions">
          <div class="edit">Modifica</div>
          <div class="delete" on:click={() => (openRemovePopup = true)}>
            Elimina
          </div>
        </div>
        <div class="enviroments">
          {#each project.enviroments as enviroment}
            <Enviroment {enviroment} />
          {/each}
        </div>
      </div>
      <div class="right">
        {#each project.standalonePlugins as plugin}
          <StandalonePlugins {plugin} />
        {/each}
      </div>
      {#if openRemovePopup}
        <div class="removePopupOverlay">
          <div
            class="removePopup"
            in:scale={{ duration: 200 }}
            out:scale={{ duration: 200 }}
          >
            <div class="title">
              Vuoi veramente eliminare<br />
              <span>{project.name}</span> ?
            </div>
            <div class="actions">
              <div on:click={() => removeProject()} class="yes">Si</div>
              <div on:click={() => (openRemovePopup = false)} class="no">
                No
              </div>
            </div>
          </div>
        </div>
      {/if}
      <div class="closeProjectInfoOverlay" on:click={() => toggleInfo(false)}>
        
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./project.scss";
</style>
