<script>
  import NewProject from "@components/NewProject/NewProject.svelte";
  import SearchProjects from "@components/SearchProjects/SearchProjects.svelte";
  import Projects from "@components/Projects/Projects.svelte";
  import Updater from "@components/Updater/Updater.svelte";

  import axios from "axios";
  axios.defaults.baseURL = "http://localhost:41968";
</script>

<div class="content">
  <Projects />
  <Updater />
  <div class="footer">
    <NewProject />
    <SearchProjects />
  </div>
</div>

<style lang="scss">
  @import "../scss/index.scss";
</style>
