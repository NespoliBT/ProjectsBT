import * as cors from "cors";
import * as express from "express";
import projectRoute from "./routes/project";
import { initDB } from "./services/initDB";

export function runServer() {
  initDB.getDB("Database.db");

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/projects", projectRoute);

  app.listen(41968);

  console.log("Listening on port 41968...");
}
