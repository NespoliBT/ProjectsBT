import { inputController } from "../controllers/inputController";
import express from "express";

const inputRoute = express.Router();

// The "/input/update" route updates a input based on its id
inputRoute.post("/update", (req, res) => inputController.updateInput(req, res));

export default inputRoute;
