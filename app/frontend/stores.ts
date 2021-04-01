import { Writable, writable } from "svelte/store";
import type { NewProject } from "./types/types";

export const newProjectStore: Writable<NewProject> = writable({
  id: 0,
  name: "",
  technology: "",
  description: "",
  enviroments: [],
  standalonePlugins: [],
});
