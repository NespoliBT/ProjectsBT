import * as express from "express";
import * as cors from "cors";
import * as Database from "better-sqlite3";
import projectRoute from "./routes/project";
const db = new Database(__dirname + "./data/Database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/projects", projectRoute);

db.exec(`

    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        
        name               TEXT,
        technology         TEXT,
        description        TEXT
    )

`);

db.exec(`

    CREATE TABLE IF NOT EXISTS enviroments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId INTEGER,
        name TEXT,

        dbUser         TEXT,  
        dbPassword     TEXT,
        dbIP           TEXT,

        userName       TEXT,
        userPassword   TEXT
    )
`);

app.listen(41968);

console.log("Listening on port 41968...");
