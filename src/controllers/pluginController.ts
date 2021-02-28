import { plugins } from "../plugins/plugins";
import { select } from "../helpers/helpers";
import { enviromentController } from "./enviromentController";

export module pluginController {
  export function addPlugin(plugin) {
    const pluginName = plugin.getAttribute("pluginName");
    const isThereAnEnv = document.getElementsByClassName("enviromentCred")
      .length;
    let currEnv: Element;

    if (!isThereAnEnv) {
      enviromentController.createEnviromentEl().classList.add("currentEnv");
    }

    currEnv = select(".currentEnv");

    select(".plugins", currEnv).innerHTML += plugins[pluginName];
  }
}
