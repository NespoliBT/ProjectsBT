import { projectController } from "../controllers/projectController";
import * as express from "express";

const projectRoute = express.Router();

projectRoute.get("/", (req, res) => projectController.getProjects(req, res));

projectRoute.post("/new", (req, res) => projectController.newProject(req, res));

export default projectRoute;
