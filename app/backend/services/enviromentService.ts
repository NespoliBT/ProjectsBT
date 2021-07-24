import { initDB } from "./initDB";
import { pluginService } from "./pluginService";

// This module is reponsable for all the database operations concerning the enviroments
export module enviromentService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  /**
   *
   * This function returns an array containing a project's enviroments
   *
   * @param id {number} - The project's ID
   * @returns The list of all the project's enviroments
   */
  export function getEnvsByProjectId(id: number) {
    // Selects all the enviroments
    const envs = db
      .prepare("SELECT * FROM enviroments WHERE projectId = (?)")
      .all(id);

    let enviroments = [];

    // Get's all the enviroment's plugins
    envs.map((e) => {
      const plugins = pluginService.getPluginsByEnvId(e.id);

      enviroments.push({
        name: e.name,
        id: e.id,
        plugins,
      });
    });

    // Returns all the project's enviroments
    return enviroments;
  }

  /**
   *
   * @param projectId - The project's ID
   * @param e - The enviroment to insert
   * @returns A formatted version of the enviroment object
   */
  export function insertEnviroment(projectId, e) {
    // Inserts the enviroment
    const enviroment = db
      .prepare(
        `INSERT INTO enviroments (
          projectId,
          name
        ) VALUES(?, ?)`
      )
      .run(projectId, e.name);

    let formattedPlugins = [];

    // Inserts all the enviroment's plugins an creates and array
    e.plugins?.map((p) => {
      const formattedPlugin = pluginService.insertPlugin(
        enviroment.lastInsertRowid,
        p
      );
      formattedPlugins.push(formattedPlugin);
    });

    // Creates a formatted enviroment object for the client
    const formattedEnviroment = {
      name: e.name,
      plugins: formattedPlugins,
    };

    // Returns the formatted enviroment object
    return formattedEnviroment;
  }

  export function remove(id: number) {
    db.prepare(
      `DELETE FROM enviroments 
      WHERE id = @id`
    ).run({ id });

    let plugins = db
      .prepare(
        `SELECT id FROM plugins 
      WHERE enviromentId = @id`
      )
      .all({ id });

    plugins.map((p: { id: number }) => pluginService.remove(p.id));
  }
}
