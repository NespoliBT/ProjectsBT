<script>
  import NewProject from "./newProjectForm/NewProject.svelte";
  import Projects from "./projects/Projects.svelte";
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
