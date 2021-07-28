<script>
  import { configService } from "../services/configService";
  import { configStore } from "../stores";
  import NewProject from "@components/NewProject/NewProject.svelte";
  import SearchProjects from "@components/SearchProjects/SearchProjects.svelte";
  import Config from "@components/Config/Config.svelte";
  import Projects from "@components/Projects/Projects.svelte";
  import Updater from "@components/Updater/Updater.svelte";

  import axios from "axios";
  axios.defaults.baseURL = "http://localhost:41968";

  configService.get("gitlab").then((config) => {
    configStore.update((state) => {
      state.gitlab = config;

      return state;
    });
  });
</script>

<div class="content">
  <Projects />
  <Updater />
  <div class="footer">
    <NewProject />
    <Config />
    <SearchProjects />
  </div>
</div>

<style lang="scss">
  @import "../scss/index.scss";
</style>
