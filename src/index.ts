import { enviromentController } from "./controllers/enviromentController";
import { pluginController } from "./controllers/pluginController";
import { projectController } from "./controllers/projectController";
import { elem } from "./helpers/helpers";
import "./scss/index.scss";
import { projectService } from "./services/projectService";
import { Project } from "./types/types";

/* Create project table */
projectService.getProjects().then((projects: [Project]) => {
  projects.map((project: Project) => {
    let projectEl = projectService.createProjectElement(project);
    elem.projectsEl.appendChild(projectEl);
  });
});

/* New project button */
elem.addProject.addEventListener("click", () =>
  projectController.openNewProjectForm()
);

/* New project form logic */
elem.newProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  projectController.newProject();
});

/* Close new project overlay logic */
elem.closeNewProjectOverlay.addEventListener("click", () => {
  projectController.closeNewProject();
});

/* Close project info overlay logic */
elem.closeProjectInfoOverlay.addEventListener("click", () => {
  projectController.closeProjectInfo();
});

elem.newEnviromentCred.addEventListener("click", () => {
  enviromentController.createEnviromentEl();
});

elem.pluginsElArray.map((plugin) => {
  plugin.addEventListener("click", () => {
    pluginController.addPlugin(plugin);
  });
});
