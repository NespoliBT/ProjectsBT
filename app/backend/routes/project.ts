import { projectController } from "../controllers/projectController";
import express from "express";

const projectRoute = express.Router();

// The "/projects" route returns the list of all projects
projectRoute.get("/", (req, res) => projectController.getProjects(req, res));

// The "/new" route is used to save a new project and returns a
// formatted object with all the project's info such as the ID
projectRoute.post("/new", (req, res) => projectController.newProject(req, res));

// The "/remove" route is used to remove a project
projectRoute.post("/remove", (req, res) =>
  projectController.removeProject(req, res)
);

export default projectRoute;
