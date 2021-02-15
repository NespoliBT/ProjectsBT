import * as Database from "better-sqlite3";
const db = new Database(__dirname + "/../data/Database.db");

module.exports = {
  getProjects: function (req, res) {
    let projects = db.prepare("SELECT * FROM projects").all();

    let formattedProjects = [];

    projects.map((p) => {
      let formattedProject;
      let enviroments = getEnvs(p);

      formattedProject = {
        id: p.id,
        name: p.name,
        technology: p.technology,
        description: p.description,
        enviroments,
      };

      formattedProjects.push(formattedProject);
    });

    // formattedProjectsprojectService.map((p) => {
    //   console.log(p);
    //   console.log("\n-----------------------\n");
    // });

    res.json(formattedProjects);
  },

  newProject: function (req, res) {
    const { name, technology, description, enviroments } = req.body;

    let projectQuery = db
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

    let id = projectQuery.lastInsertRowid;
    console.log(`A project has been inserted with rowid ${id}`);

    let formattedEnviroments = [];

    enviroments.map((e) => {
      insertEnviroment(id, e).then((formattedEnviroment) =>
        formattedEnviroments.push(formattedEnviroment)
      );
    });

    let project = {
      id,
      name,
      technology,
      description,
      formattedEnviroments,
    };

    res.send(project);
  },
};
function getEnvs(p) {
  let envs = db
    .prepare("SELECT * FROM enviroments WHERE projectId = (?)")
    .all(p.id);

  let enviroments = [];
  envs.map((e) => {
    enviroments.push({
      name: e.name,
      db: {
        user: e.dbUser,
        password: e.dbPassword,
        ip: e.dbIP,
      },
      user: {
        name: e.userName,
        password: e.userPassword,
      },
    });
  });

  return enviroments;
}

function insertEnviroment(projectId, e) {
  let enviroment = db
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
      e.db.user,
      e.db.password,
      e.db.ip,
      e.user.name,
      e.user.password
    );

  const formattedEnviroment = {
    ...e,
    id: enviroment.lastInsertRowid,
  };

  return formattedEnviroment;
}
