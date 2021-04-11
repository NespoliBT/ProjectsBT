import { inputs as i } from "./inputs";

// This file contains all the plugins an enviroment can have
const plugins = [
  {
    name: "Database",
    icon: "歷",
    inputs: [i.username, i.password, i.ip],
    envBound: true,
  },
  {
    name: "Utente",
    icon: "",
    inputs: [i.username, i.password],
    envBound: true,
  },
  {
    name: "Sito",
    icon: "",
    inputs: [i.ip],
    envBound: true,
  },
  {
    name: "Git",
    icon: "",
    inputs: [i.ip],
    envBound: false,
  },
];

export default plugins;
