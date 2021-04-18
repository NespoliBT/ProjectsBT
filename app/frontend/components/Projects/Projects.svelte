<script lang="ts">
  import { projectService } from "../../services/projectService";
  import type { ProjectT } from "../../types/types";
  import Project from "@components/Project/Project.svelte";
  import { projectsStore } from "../../stores";

  let projects: ProjectT[];

  projectService.getProjects().then((pjs: ProjectT[]) => {
    projectsStore.set(pjs);
  });

  projectsStore.subscribe((state) => (projects = state));
</script>

<div class="projects">
  {#if projects}
    {#each projects as project}
      <Project {project} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "./projects.scss";
</style>
