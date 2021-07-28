import axios from "axios";
import { configStore } from "../stores";

export module configService {
  export function get(name: string) {
    return new Promise((resolve, reject) => {
      axios
        .get("/config/get", {
          params: { name },
        })
        .then(({ data }) => resolve(data.value))
        .catch((error) => reject(error));
    });
  }

  export function set(configArray: [name: string, value: string][]) {
    configArray.forEach((config) => {
      let [name, value] = config;

      configStore.update((state) => {
        state[name] = value;

        return state;
      });

      axios
        .post("/config/set", {
          name,
          value,
        })
        .then((data) => {
          console.log(data);
        });
    });
  }
}
