import { initDB } from "./initDB";

export module inputService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  export function getInputsByPluginId(id: number) {
    // Selects all the inputs
    const inps = db
      .prepare("SELECT * FROM inputs WHERE pluginId = (?)")
      .all(id);

    let inputs = [];

    // Creates a input array with all the plugin's inputs
    inps.map((i) => {
      inputs.push({
        name: i.name,
        type: i.type,
        value: i.value,
      });
    });

    // Returns the inputs array
    return inputs;
  }

  /**
   *
   * @param pluginId - The plugin's ID
   * @param i - The input to insert
   * @returns A formatted version of the input object
   */
  export function insertInput(pluginId, i) {
    // Inserts the input
    const input = db
      .prepare(
        `INSERT INTO inputs (
            pluginId,

            name,
            type,
            value
          ) VALUES(?, ?, ?, ?)`
      )
      .run(pluginId, i.name, i.type, i.value);

    // Creates a formatted input object for the client
    const formattedInput = {
      name: i.name,
      type: i.type,
      value: i.value,
    };

    // Returns the formatted input object
    return formattedInput;
  }
}
