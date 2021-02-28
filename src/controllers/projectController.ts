import { select, elem } from "../helpers/helpers";
import { projectService } from "../services/projectService";

export module projectController {
  export function openNewProjectForm() {
    elem.newProjectOverlay.classList.add("open");
  }

  export function newProject() {
    let projectName = elem.newProjectName.value;
    let projectTechnology = elem.newProjectTechnology.value;
    let projectDescription = elem.newProjectDescription.value;
    let enviromentsEl: Element[] = Array.from(
      document.getElementsByClassName("enviromentCred")
    );

    let enviroments: any = [];

    for (const enviroment of enviromentsEl) {
      const envName = <HTMLInputElement>select(".envName", enviroment);
      const dbUser = <HTMLInputElement>select(".dbUser", enviroment);
      const dbPassword = <HTMLInputElement>select(".dbPassword", enviroment);
      const dbIP = <HTMLInputElement>select(".dbIP", enviroment);

      const userName = <HTMLInputElement>select(".userName", enviroment);
      const userPassword = <HTMLInputElement>(
        select(".userPassword", enviroment)
      );

      let formattedEnviroment = {
        name: envName.value,
        plugins: {
          db: {
            user: dbUser?.value,
            password: dbPassword?.value,
            ip: dbIP?.value,
          },
          user: {
            name: userName?.value,
            password: userPassword?.value,
          },
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
          elem.projectsEl.appendChild(projectEl);
        });

      elem.newProjectName.value = null;
      elem.newProjectTechnology.value = null;
      elem.newProjectDescription.value = null;
    }
  }

  export function closeNewProject() {
    elem.newProjectOverlay.classList.add("close");

    setTimeout(() => {
      elem.newProjectOverlay.classList.remove("open");
      elem.newProjectOverlay.classList.remove("close");
    }, 500);
  }

  export function closeProjectInfo() {
    elem.projectInfoOverlay.classList.add("close");

    setTimeout(() => {
      elem.projectInfoOverlay.classList.remove("open");
      elem.projectInfoOverlay.classList.remove("close");
    }, 500);
  }
}
