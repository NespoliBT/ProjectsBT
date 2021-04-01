<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { projectService } from "../../services/projectService";
  import type { Project } from "../../types/types";
  import Enviroment from "./Enviroment.svelte";
  export let project: Project;
  let openInfo;
  let openRemovePopup;

  function removeProject() {
    projectService.removeProject(project.id);
  }
</script>

<div class="project" tabindex="0" in:scale={{ duration: 500 }}>
  <div class="header" on:click={() => (openInfo = true)}>
    <div class="name">{project.name}</div>
    <div class="technology">{project.technology}</div>
  </div>
  <div class="description">{project.description}</div>
</div>

{#if openInfo}
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
      <div class="right" />
      {#if openRemovePopup}
        <div class="removePopupOverlay">
          <div
            class="removePopup"
            in:scale={{ duration: 500 }}
            out:scale={{ duration: 500 }}
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
      <div class="closeProjectInfoOverlay" on:click={() => (openInfo = false)}>
        
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./scss/project.scss";
</style>
