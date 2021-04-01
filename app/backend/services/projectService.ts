import { initDB } from "./initDB";

export module projectService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  export function getAll() {
    // Selects all the projects
    return db.prepare("SELECT * FROM projects").all();
  }

  export function insert(
    name: string,
    technology: string,
    description: string
  ) {
    // Inserts the project
    const project = db
      .prepare(
        `INSERT INTO projects (
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

    // returns the project's id
    return project.lastInsertRowid;
  }

  export function remove(id: number) {
    // Remove the project

    db.prepare(
      `DELETE FROM projects 
      WHERE id = @id`
    ).run({ id });
  }
}
