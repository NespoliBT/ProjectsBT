import plugins from "../plugins/plugins";

// All plugin related calls end up here
export module pluginController {
  /**
   *
   * @param req - The client's request
   * @param res - The response object
   */
  export function getPlugins(req, res) {
    res.json(plugins);
  }
}
