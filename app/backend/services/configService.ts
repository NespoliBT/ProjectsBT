import { initDB } from "./initDB";

export module configService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  export function get(name) {

    const config = db
      .prepare("SELECT * FROM config WHERE name = @name")
      .all({ name })[0];

    return config;
  }

  export function set(name, value) {
    const config = db
      .prepare("SELECT * FROM config WHERE name = @name")
      .all({ name });

    if (config[0]) {
      db.prepare("UPDATE config SET value = @value WHERE id = @id").run({
        id: config[0].id,
        value,
      });
    } else {
      db.prepare("INSERT INTO config (name, value) VALUES (@name, @value)").run(
        {
          name,
          value,
        }
      );
    }
  }
}
