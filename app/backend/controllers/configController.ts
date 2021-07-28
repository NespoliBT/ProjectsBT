import { configService } from "../services/configService";

// All config related calls end up here
export module configController {
  export function get(req, res) {
    const { name } = req.query;
    console.log("asd");

    res.status(200).json(configService.get(name));
  }
  export function set(req, res) {
    const { name, value } = req.body;
    console.log(req.body);
    configService.set(name, value);
    res.status(200).json({ message: "Config value set" });
  }
}
