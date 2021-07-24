import plugins from "../plugins/plugins";

// All plugin related calls end up here
export module pluginController {
  export function getPlugins(req, res) {
    res.json(plugins);
  }
}
