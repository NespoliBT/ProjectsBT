const content = document.getElementsByClassName("content")[0];

/** Shorthand for document.getElementById(id) */
export const select = (id: string, el = content) => el.querySelector(id);

export const elem = {
  /* Select elements from the DOM */
  projectsEl: select("#projects"),
  addProject: select("#addProject"),
  enviromentsEl: select("#enviroments"),
  newProjectForm: select("#newProjectForm"),
  newProjectOverlay: select("#newProjectOverlay"),
  newEnviromentCred: select("#newEnviromentCred"),
  projectInfoOverlay: select("#projectInfoOverlay"),
  closeNewProjectOverlay: select("#closeNewProjectOverlay"),
  closeProjectInfoOverlay: select("#closeProjectInfoOverlay"),
  newProjectName: <HTMLInputElement>select("#newProjectName"),
  newProjectTechnology: <HTMLInputElement>select("#newProjectTechnology"),
  newProjectDescription: <HTMLInputElement>select("#newProjectDescription"),
  pluginsElArray: <Element[]>(
    Array.from(document.getElementsByClassName("plugin"))
  ),
};

export function createElement({ className = "", id = "", content = "" }) {
  let element = document.createElement("div");
  element.setAttribute("class", className);
  element.setAttribute("id", id);
  element.innerHTML = content;

  return element;
}
