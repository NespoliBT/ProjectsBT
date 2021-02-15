import axios from "axios";

axios.defaults.baseURL = "http://localhost:41968";

interface Project {
  id: number;
  name: string;
  technology: string;
  description: string;
}

interface Project {
  id: number;
  name: string;
  technology: string;
  description: string;
  prodInfo?: {
    db?: {
      user: string;
      password: string;
      ip: string;
    };
    user?: {
      name: string;
      password: string;
    };
  };
  stagInfo?: {
    db?: {
      user: string;
      password: string;
      ip: string;
    };
    user?: {
      name: string;
      password: string;
    };
  };
  devInfo?: {
    db?: {
      user: string;
      password: string;
      ip: string;
    };
    user?: {
      name: string;
      password: string;
    };
  };
  enviroments?: [
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

    console.log(project);

    project.enviroments?.map((env) => {
      console.log(env);

      const envEl = createElement({
        className: "enviroment",
      });

      const envName = createElement({
        className: "envName",
        content: env.name,
      });

      const dbEl = createElement({
        className: "db",
      });

      const dbUser = createElement({
        className: "credential username",
        content: env.db.user,
      });

      const dbPassword = createElement({
        className: "credential password",
        content: env.db.password,
      });

      const dbIP = createElement({
        className: "credential ip",
        content: env.db.ip,
      });

      const userEl = createElement({
        className: "user",
      });

      const userName = createElement({
        className: "credential username",
        content: env.user.name,
      });

      const userPassword = createElement({
        className: "credential password",
        content: env.user.password,
      });

      credentials.innerHTML = "";

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

function createElement({ className = "", id = "", content = "" }) {
  let element = document.createElement("div");
  element.setAttribute("class", className);
  element.setAttribute("id", id);
  element.innerHTML = content;

  return element;
}
