import { projectService } from "../services/projectService";
import { enviromentService } from "../services/enviromentService";
import { pluginService } from "../services/pluginService";

// All project related calls end up here
export module projectController {
  /**
   *
   * This function is responsable for the request of all the
   *  projects stored in the database
   *
   * @param req - The client's request
   * @param res - The response object
   */
  export function getProjects(req, res) {
    // Gets all the project from the database
    const projects = projectService.getAll();

    let formattedProjects = [];

    // Creates an array which contains all the projects
    projects.map((p) => {
      let formattedProject;

      // Gets the project's [p] enviroments
      let enviroments = enviromentService.getEnvsByProjectId(p.id);

      let standalonePlugins = pluginService.getPluginsByProjectId(p.id);

      // Creates the formatted project object
      formattedProject = {
        id: p.id,
        name: p.name,
        technology: p.technology,
        description: p.description,
        enviroments,
        standalonePlugins,
      };

      // Updates the formatted projects array with the new project
      formattedProjects.push(formattedProject);
    });

    // Sends the formatted project array to the client
    res.json(formattedProjects);
  }

  /**
   *
   * This function is reponsable for the creation of a new project
   *
   * @param req - The client's request
   * @param res - The response object
   */
  export function newProject(req, res) {
    const {
      name,
      technology,
      description,
      enviroments,
      standalonePlugins,
    } = req.body;

    // The new project's id is saved when it is inserted in the database
    const id = projectService.insert(name, technology, description);

    let formattedEnviroments = [];
    let formattedStandalonePlugins = [];

    // Inserts all the project's enviroments and creates and array
    enviroments?.map((e) => {
      const formattedEnviroment = enviromentService.insertEnviroment(id, e);
      formattedEnviroments.push(formattedEnviroment);
    });

    standalonePlugins?.map((p) => {
      const formattedStandalonePlugin = pluginService.insertPlugin(null, p, id);
      formattedStandalonePlugins.push(formattedStandalonePlugin);
    });

    // Creates a project object for the client
    let project = {
      id,
      name,
      technology,
      description,
      enviroments: formattedEnviroments,
      standalonePlugins: formattedStandalonePlugins,
    };

    // Sends the project object to the client
    res.send(project);
  }

  export function removeProject(req, res) {
    const id = req.body.id;

    projectService.remove(id);

    res.sendStatus(200);
  }
}
