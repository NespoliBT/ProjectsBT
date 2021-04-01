<script lang="ts">
  import type { Input } from "../../types/types";
  export let input: Input;
</script>

<div class="input">
  <span class="name">{input.name}:</span>
  {input.value}
</div>

<style lang="scss">
  @import "./scss/input.scss";
</style>
