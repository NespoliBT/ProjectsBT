import { initDB } from "./initDB";
import { inputService } from "./inputService";

export module pluginService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  export function getPluginsByEnvId(id: number) {
    // Selects all the plugins
    const plugs = db
      .prepare("SELECT * FROM plugins WHERE enviromentId = (?)")
      .all(id);

    let plugins = [];

    // Get's all the plugin's inputs
    plugs.map((p) => {
      const inputs = inputService.getInputsByPluginId(p.id);

      plugins.push({
        name: p.name,
        id: p.id,
        inputs,
      });
    });

    // Returns all the enviroment's plugins
    return plugins;
  }

  export function getPluginsByProjectId(id: number) {
    // Selects all the plugins
    const plugs = db
      .prepare("SELECT * FROM plugins WHERE projectId = (?)")
      .all(id);

    let plugins = [];

    // Get's all the plugin's inputs
    plugs.map((p) => {
      const inputs = inputService.getInputsByPluginId(p.id);

      plugins.push({
        name: p.name,
        inputs,
      });
    });

    // Returns all the project's plugins
    return plugins;
  }

  export function insertPlugin(envId, p, projectId: number = null) {
    // Inserts the plugin
    const plugin = db
      .prepare(
        `INSERT INTO plugins (
          enviromentId,
          projectId,
          name
        ) VALUES(?, ?, ?)`
      )
      .run(envId, projectId, p.name);

    let formattedInputs = [];

    // Inserts all the plugin's inputs and creates an array
    p.inputs.map((i) => {
      const formattedInput = inputService.insertInput(
        plugin.lastInsertRowid,
        i
      );

      formattedInputs.push(formattedInput);
    });

    // Creates a formatted plugin object for the client
    const formattedPlugin = {
      name: p.name,
      inputs: formattedInputs,
    };

    // Returns the formatted plugin object
    return formattedPlugin;
  }

  export function remove(id: number) {
    db.prepare(
      `DELETE FROM plugins 
      WHERE id = @id`
    ).run({ id });

    let plugins = db
      .prepare(
        `SELECT id FROM inputs 
        WHERE pluginId = @id`
      )
      .all({ id });

    plugins.map((i: { id: number }) => inputService.remove(i.id));
  }
}
