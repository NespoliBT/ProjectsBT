<script>
  import NewProject from "@components/NewProject/NewProject.svelte";
  import Projects from "@components/Projects/Projects.svelte";
  import axios from "axios";
  axios.defaults.baseURL = "http://localhost:41968";
</script>

<div class="content">
  <Projects />
  <NewProject />
</div>

<style lang="scss">
  @import "../scss/index.scss";
</style>
