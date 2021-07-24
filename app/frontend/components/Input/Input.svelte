<script lang="ts">
  import type { InputT } from "../../types/types";
  import { shell } from "electron";
  export let input: InputT;
</script>

<div class="input">
  <span class="name">{input.name}:</span>
  {#if input.type === "ip"}
    <div class="link" on:click={() => shell.openExternal(input.value)}>
      {input.value}
    </div>
  {:else}
    {input.value}
  {/if}
</div>

<style lang="scss">
  @import "./input.scss";
</style>
