<script lang="ts">
  import { projectService } from "../../services/projectService";
  import type { Project } from "../../types/types";
  import ProjectC from "./ProjectC.svelte";

  let projects: Project[];

  projectService.getProjects().then((pjs: Project[]) => {
    projects = pjs;
  });
</script>

<div class="projects">
  {#if projects}
    {#each projects as project}
      <ProjectC {project} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "./scss/projects.scss";
</style>
