import { pluginController } from "../controllers/pluginController";
import express from "express";

const pluginRoute = express.Router();

// The "/plugins" route returns the list of possible plugins
pluginRoute.get("/", (req, res) => pluginController.getPlugins(req, res));

export default pluginRoute;
