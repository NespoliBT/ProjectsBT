<script lang="ts">
  import { fly } from "svelte/transition";
  import { newProjectStore } from "../../stores";
  import type { NewProject, FormPlugin } from "../../types/types";
  import NewEnviroments from "./NewEnviroments.svelte";
  import { pluginService } from "../../services/pluginService";
  import { projectService } from "../../services/projectService";

  let projectName = "";
  let projectTechnology = "";
  let projectDescription = "";
  let pluginButtons: FormPlugin[];
  let formOpen = false;
  let NewEnviromentsComponent;
  let newProject: NewProject;

  newProjectStore.subscribe((state) => (newProject = state));

  pluginService
    .getPluginButtons()
    .then((pB: FormPlugin[]) => (pluginButtons = pB));

  function submitForm(e) {
    e.preventDefault();

    if (projectName && projectTechnology && projectDescription) {
      projectService
        .createProject(newProject)
        .then((projectEl: HTMLElement) => {
          console.log(projectEl);
        });
    }
  }

  function closeForm() {
    formOpen = false;

    newProjectStore.set({
      id: 0,
      name: "",
      technology: "",
      description: "",
      enviroments: [],
      standalonePlugins: [],
    });

    projectName = "";
    projectTechnology = "";
    projectDescription = "";
  }
</script>

<div class="newProjectButton" on:click={() => (formOpen = true)}></div>

{#if formOpen}
  <div class="newProjectFormOverlay" in:fly={{ x: -500 }} out:fly={{ x: -500 }}>
    <form on:submit={submitForm}>
      <h1>Nuovo Progetto</h1>
      <div class="left">
        <input
          bind:value={projectName}
          on:input={() =>
            newProjectStore.update((state) => {
              state.name = projectName;
              return state;
            })}
          name="name"
          type="text"
          placeholder="Nome"
        />
        <input
          bind:value={projectTechnology}
          on:input={() =>
            newProjectStore.update((state) => {
              state.technology = projectTechnology;
              return state;
            })}
          type="text"
          name="tech"
          placeholder="Tecnologia"
        />
        <textarea
          bind:value={projectDescription}
          on:input={() =>
            newProjectStore.update((state) => {
              state.description = projectDescription;
              return state;
            })}
          cols="30"
          name="desc"
          rows="10"
          placeholder="Descrizione"
        />
        <div class="pluginButtons">
          {#each pluginButtons as pluginButton}
            <div
              class="pluginButton"
              on:click={NewEnviromentsComponent.addPlugin(pluginButton)}
            >
              {pluginButton.icon}
            </div>
          {/each}
        </div>
      </div>
      <div class="right">
        <NewEnviroments bind:this={NewEnviromentsComponent} />
      </div>
      <button type="submit" class="submit">Salva</button>
      <div class="close" on:click={() => closeForm()}></div>
    </form>
  </div>
{/if}

<style lang="scss">
  @import "./scss/newProject.scss";
</style>
