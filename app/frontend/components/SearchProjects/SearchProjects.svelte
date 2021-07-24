<script lang="ts">
  import { searchProjectsStore } from "../../stores";

  function searchProjects(e) {
    let query = e.target.value;
    searchProjectsStore.update((state) => {
      state = query;
      return state;
    });
  }
</script>

<input
  type="text"
  placeholder="Cerca"
  class="searchProjects"
  on:input={(e) => searchProjects(e)}
/>

<style lang="scss">
  @import "./searchProjects.scss";
</style>
