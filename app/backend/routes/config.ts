import { configController } from "../controllers/configController";
import express from "express";

const configRoute = express.Router();

// The "/config/get" route retrieves a config based on its name
configRoute.get("/get", (req, res) => configController.get(req, res));

// The "/config/set" route sets a config based on its name and value
configRoute.post("/set", (req, res) => configController.set(req, res));

export default configRoute;
