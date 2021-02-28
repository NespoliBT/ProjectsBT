import { projectService } from "../services/projectService";
import { enviromentService } from "../services/enviromentService";

export module projectController {
  export function getProjects(req, res) {
    const projects = projectService.getAll();

    let formattedProjects = [];

    projects.map((p) => {
      let formattedProject;

      let enviroments = enviromentService.getEnvsByProjectId(p.id);

      formattedProject = {
        id: p.id,
        name: p.name,
        technology: p.technology,
        description: p.description,
        enviroments,
      };

      formattedProjects.push(formattedProject);
    });

    res.json(formattedProjects);
  }

  export function newProject(req, res) {
    const { name, technology, description, enviroments } = req.body;

    const id = projectService.insert(name, technology, description);

    let formattedEnviroments = [];

    enviroments.map((e) => {
      const formattedEnviroment = enviromentService.insertEnviroment(id, e);
      formattedEnviroments.push(formattedEnviroment);
    });

    let project = {
      id,
      name,
      technology,
      description,
      enviroments: formattedEnviroments,
    };

    res.send(project);
  }
}
