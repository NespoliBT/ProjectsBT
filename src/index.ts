import "./scss/index.scss";

import { projectService } from "./services/projectService";

interface Project {
  id: number;
  name: string;
  technology: string;
  description: string;
  prodInfo?: {};
  stagInfo?: {};
  devInfo?: {};
  enviroments: [
    {
      name: string;
      db: {
        user: string;
        password: string;
        ip: string;
      };
      user: {
        name: string;
        password: string;
      };
    }
  ];
}

const content = document.getElementsByClassName("content")[0];

/** Shorthand for document.getElementById(id) */
const select = (id: string, el = content) => el.querySelector(id);

/* Select elements from the DOM */
const projectsEl = select("#projects");
const addProject = select("#addProject");
const newProjectForm = select("#newProjectForm");
const newProjectOverlay = select("#newProjectOverlay");
const projectInfoOverlay = select("#projectInfoOverlay");
const closeNewProjectOverlay = select("#closeNewProjectOverlay");
const closeProjectInfoOverlay = select("#closeProjectInfoOverlay");

const newProjectName = <HTMLInputElement>select("#newProjectName");
const newProjectTechnology = <HTMLInputElement>select("#newProjectTechnology");
const newProjectDescription = <HTMLInputElement>(
  select("#newProjectDescription")
);

/* Create project table */
projectService.getProjects().then((projects: [Project]) => {
  projects.map((project: Project) => {
    let projectEl = projectService.createProjectElement(project);
    projectsEl.appendChild(projectEl);
  });
});

/* New project button */
addProject.addEventListener("click", () => {
  newProjectOverlay.classList.add("open");
});

/* New project form logic */
newProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let projectName = newProjectName.value;
  let projectTechnology = newProjectTechnology.value;
  let projectDescription = newProjectDescription.value;
  let enviromentsEl: Element[] = Array.from(
    document.getElementsByClassName("enviromentCred")
  );

  let enviroments: any = [];

  for (const enviroment of enviromentsEl) {
    console.log(enviroment);

    console.log(enviroment.querySelector(".dbUser"));

    const dbUser = <HTMLInputElement>select(".dbUser", enviroment);
    const dbPassword = <HTMLInputElement>select(".dbPassword", enviroment);
    const dbIP = <HTMLInputElement>select(".dbIP", enviroment);

    const userName = <HTMLInputElement>select(".userName", enviroment);
    const userPassword = <HTMLInputElement>select(".userPassword", enviroment);

    let formattedEnviroment = {
      name: "prod",
      db: {
        user: dbUser.value,
        password: dbPassword.value,
        ip: dbIP.value,
      },
      user: {
        name: userName.value,
        password: userPassword.value,
      },
    };

    enviroments.push(formattedEnviroment);
  }

  if (projectName) {
    projectService
      .createProject({
        id: null,
        name: projectName,
        technology: projectTechnology,
        description: projectDescription,
        enviroments,
      })
      .then((projectEl: HTMLElement) => {
        projectsEl.appendChild(projectEl);
      });

    newProjectName.value = null;
    newProjectTechnology.value = null;
    newProjectDescription.value = null;
  }
});

/* Close new project overlay logic */
closeNewProjectOverlay.addEventListener("click", () => {
  newProjectOverlay.classList.add("close");

  setTimeout(() => {
    newProjectOverlay.classList.remove("open");
    newProjectOverlay.classList.remove("close");
  }, 500);
});

/* Close project info overlay logic */
closeProjectInfoOverlay.addEventListener("click", () => {
  projectInfoOverlay.classList.add("close");

  setTimeout(() => {
    projectInfoOverlay.classList.remove("open");
    projectInfoOverlay.classList.remove("close");
  }, 500);
});
