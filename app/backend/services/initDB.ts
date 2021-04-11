import Database from "better-sqlite3";
import fs from "fs";

export module initDB {
  export let db;

  /**
   *
   * @param dbName The name of the file containing the database
   * @returns A connection to the database
   */
  export function getDB(dbName) {
    // If the database folder does not exist it gets created
    if (!fs.existsSync(`${__dirname}/data/`)) {
      fs.mkdirSync(`${__dirname}/data/`);
    }

    // If a connection to the database does not already exist it creates one
    // It also creates the database if it does not exist and runs it's migrations
    if (!db) {
      db = new Database(__dirname + `/data/${dbName}`);
      runMigrations(db);
    }

    // returns a connection to the database
    return db;
  }
}

/**
 *
 * @param db The connection to the database
 */
function runMigrations(db: Database) {
  // Creates the projects table
  db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    
    name           TEXT,
    technology     TEXT,
    description    TEXT
  )
`);

  // Creates the enviroments table
  db.exec(`
  CREATE TABLE IF NOT EXISTS enviroments (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,

    projectId      INTEGER,
    name           TEXT
  )
`);

  // Creates the plugins table
  db.exec(`
  CREATE TABLE IF NOT EXISTS plugins (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    enviromentId   INTEGER,
    projectId      INTEGER,
    name           TEXT
  )
`);

  // Creates the inputs table
  db.exec(`
  CREATE TABLE IF NOT EXISTS inputs (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,

    pluginId       INTEGER,

    name           TEXT,
    type           TEXT,
    value          TEXT
  )
`);
}
