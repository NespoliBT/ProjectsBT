<script lang="ts">
  import { projectService } from "../../services/projectService";
  import type { ProjectT } from "../../types/types";
  import Project from "@components/Project/Project.svelte";
  import { projectsStore, searchProjectsStore } from "../../stores";

  let projects: ProjectT[];
  let filteredProjects: ProjectT[];
  let searchQuery: string;

  projectService.getProjects().then((pjs: ProjectT[]) => {
    projectsStore.set(pjs);
  });

  projectsStore.subscribe((state) => {
    projects = state;
    filteredProjects = filterProjects(projects, searchQuery);
  });

  searchProjectsStore.subscribe((state) => {
    searchQuery = state;
    filteredProjects = filterProjects(projects, searchQuery);
  });

  function filterProjects(projects: ProjectT[], searchQuery: string) {
    return projects.filter((project) => {
      return project.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
</script>

<div class="projects">
  {#if filteredProjects}
    {#each filteredProjects as project}
      <Project {project} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "./projects.scss";
</style>
