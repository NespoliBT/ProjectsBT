const projectService = require("../services/projectService");
import * as express from "express";

const projectRoute = express.Router();

projectRoute.get("/", (req, res) => projectService.getProjects(req, res));

projectRoute.post("/new", (req, res) => projectService.newProject(req, res));

export default projectRoute;
