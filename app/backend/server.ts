import cors from "cors";
import express from "express";
import projectRoute from "./routes/project";
import pluginRoute from "./routes/plugin";
import { initDB } from "./services/initDB";

// Main server function
export function runServer() {
  // Starts a connection to the database
  initDB.getDB("Database.db");

  // Starts the express process
  const app = express();

  // Express configs
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use("/projects", projectRoute);
  app.use("/plugins", pluginRoute);

  // The port used by the server
  app.listen(41968);

  console.log("Listening on port 41968...");
}
