import { Writable, writable } from "svelte/store";
import type { NewProject, ProjectT } from "./types/types";

export const newProjectStore: Writable<NewProject> = writable({
  id: 0,
  name: "",
  technology: "",
  description: "",
  enviroments: [],
  standalonePlugins: [],
});

export const projectsStore: Writable<ProjectT[]> = writable([]);

export const searchProjectsStore: Writable<string> = writable("");
