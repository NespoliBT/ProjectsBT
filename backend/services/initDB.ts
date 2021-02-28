import * as Database from "better-sqlite3";
import * as fs from "fs";

export module initDB {
  export let db;

  export function getDB(dbName) {
    if (!fs.existsSync(`${__dirname}/data/`)) {
      fs.mkdirSync(`${__dirname}/data/`);
    }

    if (!db) {
      db = new Database(__dirname + `/data/${dbName}`);

      db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          
          name           TEXT,
          technology     TEXT,
          description    TEXT
        )

        CREATE TABLE IF NOT EXISTS enviroments (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,

          projectId      INTEGER,
          name           TEXT,

          dbUser         TEXT,  
          dbPassword     TEXT,
          dbIP           TEXT,

          userName       TEXT,
          userPassword   TEXT
        )

        CREATE TABLE IF NOT EXISTS plugins (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          enviromentId   INTEGER,
          name           TEXT
        )

        CREATE TABLE IF NOT EXISTS inputs (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,

          pluginId       INTEGER,

          name           TEXT,
          value          TEXT
        )
      `);
    }

    return db;
  }
}
