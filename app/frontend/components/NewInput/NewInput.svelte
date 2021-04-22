<script lang="ts">
  import { newProjectStore } from "../../stores";
  import type { FormInput } from "../../types/types";
  export let input: FormInput;
  export let pluginId;
  export let envId;
  export let inputId;
  export let envBound;

  const regexIP = new RegExp(
    "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$"
  );

  const regexAddress = new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$"
  );

  let err = false;

  function setValue(e, type) {
    let value = e.target.value;

    switch (type) {
      case "ip":
        err = !(regexIP.test(value) || regexAddress.test(value));
        break;
      case "git":
        try {
          let addr = value;
          const addrArray = addr.split("/");
          const flavour = addrArray[2].split(".")[0];
          let owner = "";
          let repo = "";

          if (flavour == "github") {
            owner = addrArray[3];
            repo = addrArray[4].split(".")[0];
          }
          err = false;
        } catch {
          err = true;
        }

        break;
    }

    newProjectStore.update((state) => {
      if (!envBound) {
        state.standalonePlugins[pluginId].inputs[inputId].value = value;
      } else {
        state.enviroments[envId].plugins[pluginId].inputs[
          inputId
        ].value = value;
      }

      return state;
    });
  }

  newProjectStore.update((state) => {
    if (!envBound) {
      state.standalonePlugins[pluginId].inputs = [
        ...state.standalonePlugins[pluginId].inputs,
        {
          name: input.name,
          type: input.type,
          value: "",
        },
      ];
    } else {
      state.enviroments[envId].plugins[pluginId].inputs = [
        ...state.enviroments[envId].plugins[pluginId].inputs,
        {
          name: input.name,
          type: input.type,
          value: "",
        },
      ];
    }
    return state;
  });
</script>

{#if input.type == "ip" || input.type == "git"}
  <input
    type="text"
    class={"ip" + (err ? " err" : "")}
    placeholder={input.placeholder}
    on:input={(e) => setValue(e, input.type)}
  />
{:else}
  <input
    type={input.type}
    placeholder={input.placeholder}
    on:input={(e) => setValue(e, input.type)}
  />
{/if}

<style lang="scss">
  @import "./newInput.scss";
</style>
