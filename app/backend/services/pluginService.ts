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
        inputs,
      });
    });

    // Returns all the enviroment's plugins
    return plugins;
  }

  export function insertPlugin(envId, p) {
    // Inserts the plugin
    const plugin = db
      .prepare(
        `INSERT INTO plugins (
          enviromentId,
          name
        ) VALUES(?, ?)`
      )
      .run(envId, p.name);

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
      formattedInputs,
    };

    // Returns the formatted plugin object
    return formattedPlugin;
  }
}
