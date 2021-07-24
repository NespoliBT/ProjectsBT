import axios from "axios";
import type { NewProject } from "../types/types";

export module projectService {
  export function getProjects() {
    return new Promise((resolve, reject) => {
      axios
        .get("/projects")
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function createProject(project: NewProject) {
    let { name, technology, description, enviroments, standalonePlugins } =
      project;

    return new Promise((resolve, reject) => {
      axios
        .post("/projects/new", {
          name,
          technology,
          description,
          enviroments,
          standalonePlugins,
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function removeProject(id: number) {
    return new Promise((resolve, reject) => {
      axios
        .post("/projects/remove", { id })
        // ! Sto then e catch non fanno una bega
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function updateInput(id: number, value: string) {
    return new Promise((resolve, reject) => {
      axios
        .post("/inputs/update", { id, value })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
