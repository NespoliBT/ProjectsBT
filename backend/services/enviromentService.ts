import { initDB } from "./initDB";

export module enviromentService {
  const db = initDB.getDB("Database.db");

  export function getEnvsByProjectId(id: number) {
    const envs = db
      .prepare("SELECT * FROM enviroments WHERE projectId = (?)")
      .all(id);

    let enviroments = [];

    envs.map((e) => {
      enviroments.push({
        name: e.name,
        plugins: {
          db: {
            user: e.dbUser,
            password: e.dbPassword,
            ip: e.dbIP,
          },
          user: {
            name: e.userName,
            password: e.userPassword,
          },
        },
      });
    });

    return enviroments;
  }

  export function insertEnviroment(projectId, e) {
    const enviroment = db
      .prepare(
        `INSERT INTO enviroments(
          projectId,
          name,
    
          dbUser,  
          dbPassword,
          dbIP,
    
          userName,
          userPassword
        ) VALUES(?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        projectId,
        e.name,
        e.plugins.db.name,
        e.plugins.db.password,
        e.plugins.db.ip,

        e.plugins.user.name,
        e.plugins.user.password
      );

    const formattedEnviroment = {
      ...e,
      id: enviroment.lastInsertRowid,
    };

    return formattedEnviroment;
  }
}
