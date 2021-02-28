import { elem, createElement, select } from "../helpers/helpers";

export module enviromentController {
  export function createEnviromentEl() {
    const enviromentCredEl = createElement({
      className: "enviromentCred",
      content: `
        <input
          type="text"
          class="envName"
          placeholder="Nome enviroment"
        />
        <div class="plugins"></div>
        <div class="deleteEnv" onclick="this.parentElement.remove()">Elimina</div>
      `,
    });

    enviromentCredEl.addEventListener("mouseover", () => {
      let envs = <Element[]>(
        Array.from(document.querySelectorAll(".enviromentCred"))
      );

      envs.map((env) => {
        env.classList.remove("currentEnv");
        enviromentCredEl.classList.add("currentEnv");
      });
    });

    elem.enviromentsEl.appendChild(enviromentCredEl);

    return enviromentCredEl;
  }
}
