<script lang="ts">
  import { projectService } from "../../services/projectService";
  import type { ProjectT } from "../../types/types";
  import Project from "@components/Project/Project.svelte";

  let projects: ProjectT[];

  projectService.getProjects().then((pjs: ProjectT[]) => {
    projects = pjs;
  });
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
