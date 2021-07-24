import axios from "axios";

export module pluginService {
  export function getPluginButtons() {
    return new Promise((resolve, reject) => {
      axios
        .get("/plugins")
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
