import axios from "axios";
import { createElement } from "../helpers/helpers";
import { Project } from "../types/types";

axios.defaults.baseURL = "http://localhost:41968";

/** Shorthand for document.getElementById(id) */
const select = (id: string) => document.getElementById(id);

const projectName = select("projectName");
const projectTechnology = select("projectTechnology");
const projectDescription = select("projectDescription");
const projectInfoOverlay = select("projectInfoOverlay");

const credentials = select("credentials");

export module projectService {
  export function openProjectInfo(project: Project) {
    projectName.innerHTML = project.name;
    projectTechnology.innerHTML = project.technology;
    projectDescription.innerHTML = project.description;

    credentials.innerHTML = "";

    project.enviroments?.map((env) => {
      const envEl = createElement({
        className: "enviroment",
      });

      const envName = createElement({
        className: "envName",
        content: env.name,
      });

      Object.keys(env.plugins).map((e) => {
        console.log(env.plugins[e]);
      });

      const dbEl = createElement({
        className: "db",
      });

      const dbUser = createElement({
        className: "credential username",
        content: env.plugins.db.user,
      });

      const dbPassword = createElement({
        className: "credential password",
        content: env.plugins.db.password,
      });

      const dbIP = createElement({
        className: "credential ip",
        content: env.plugins.db.ip,
      });

      const userEl = createElement({
        className: "user",
      });

      const userName = createElement({
        className: "credential username",
        content: env.plugins.user.name,
      });

      const userPassword = createElement({
        className: "credential password",
        content: env.plugins.user.password,
      });

      dbEl.append(dbUser, dbPassword, dbIP);
      userEl.append(userName, userPassword);

      envEl.append(envName, dbEl, userEl);
      credentials.append(envEl);
    });

    projectInfoOverlay.classList.add("open");
  }

  export function getProjects() {
    return new Promise((resolve, reject) => {
      axios
        .get("/projects")
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function createProjectElement(project: Project) {
    let projectEl = createElement({
      className: "project",
    });
    let headerEl = createElement({
      className: "header",
      id: project.id.toString(),
    });
    let nameEl = createElement({
      className: "name",
      content: project.name,
    });
    let technologyEl = createElement({
      className: "technology",
      content: project.technology,
    });
    let descriptionEl = createElement({
      className: "description",
      content: project.description,
    });

    headerEl.addEventListener("click", () => {
      openProjectInfo(project);
    });

    headerEl.appendChild(nameEl);
    headerEl.appendChild(technologyEl);

    projectEl.appendChild(headerEl);
    projectEl.appendChild(descriptionEl);

    return projectEl;
  }

  export function createProject(project: Project) {
    let { name, technology, description, enviroments } = project;
    return new Promise((resolve, reject) => {
      axios
        .post("/projects/new", {
          name,
          technology,
          description,
          enviroments,
        })
        .then(({ data }) => {
          let projectElement = createProjectElement(data);

          resolve(projectElement);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
