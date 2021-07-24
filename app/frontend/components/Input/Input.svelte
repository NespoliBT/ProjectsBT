<script lang="ts">
  import type { InputT } from "../../types/types";
  import { projectService } from "../../services/projectService";

  import { shell } from "electron";

  export let input: InputT;

  let edit = false;
  let newInputValue: string;

  function saveInput() {
    edit = false;
    input.value = newInputValue;

    projectService.updateInput(input.id, newInputValue);
  }
</script>

<div class="input">
  <span
    class={"name" + (edit ? "" : " editable")}
    on:click={() => (edit = true)}>{input.name}:</span
  >
  {#if input.type === "ip" && !edit}
    <div class="link" on:click={() => shell.openExternal(input.value)}>
      {input.value}
    </div>
  {:else}
    <div
      class="value"
      contenteditable={edit ? "true" : "false"}
      on:input={(e) => {
        let newInputEl = e.currentTarget;
        newInputValue = newInputEl.innerText;
      }}
    >
      {input.value}
    </div>
  {/if}
  {#if edit}
    <div class="save" on:click={() => saveInput()}></div>
  {/if}
</div>

<style lang="scss">
  @import "./input.scss";
</style>
