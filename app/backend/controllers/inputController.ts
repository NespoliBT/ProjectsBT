import { inputService } from "../services/inputService";

// All input related calls end up here
export module inputController {
  export function updateInput(req, res) {
    const { id, value } = req.body;

    inputService.update(id, value);
  }
}
