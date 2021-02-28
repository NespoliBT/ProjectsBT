import { initDB } from "./initDB";

export module projectService {
  const db = initDB.getDB("Database.db");

  export function getAll() {
    return db.prepare("SELECT * FROM projects").all();
  }

  export function insert(
    name: string,
    technology: string,
    description: string
  ) {
    const query = db
      .prepare(
        `INSERT INTO projects(
        name,
        technology,
        description
        
        ) VALUES(@name, @technology, @description)`
      )
      .run({
        name,
        technology,
        description,
      });

    return query.lastInsertRowid;
  }
}
