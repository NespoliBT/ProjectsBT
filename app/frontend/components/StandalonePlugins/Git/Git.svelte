<script lang="ts">
  const EmojiConvertor = require("emoji-js");
  const marked = require("marked");
  import { scale } from "svelte/transition";
  import { pluginService } from "../../../services/pluginService";
  import type { InputT } from "../../../types/types";
  import { shell } from "electron";

  export let inputs: InputT[];

  const commitPerPlugin = 3;

  const emoji = new EmojiConvertor();
  emoji.replace_mode = "unified";
  emoji.allow_native = true;
  let notFound: boolean;
  let addr = inputs[0].value;
  const addrArray = addr?.split("/");
  const flavour = addrArray[2]?.split(".")[0];
  let owner = "";
  let repo = "";
  let readme: string;
  let description: string;

  if (flavour == "github") {
    owner = addrArray[3];
    repo = addrArray[4].split(".")[0];
  }

  let commits = [];
  let branches = [];
  let selectedBranch = "";
  let open = false;

  let commitsOpen = true;

  let branchSelectOpen = false;

  pluginService
    .getGitInfo(addr)
    .then((data: { readme: any; description: string }) => {
      readme = data.readme;
      description = data.description;
    })
    .catch((e) => {
      notFound = true;
    });

  pluginService.getGitBranches(addr).then((data) => {
    branches = data.reverse();
    selectedBranch = branches[0].name;
  });

  pluginService
    .getGitCommitsByBranch(selectedBranch, addr)
    .then((data: any[]) => {
      console.log(data);
      commits = data;
      commits.map((c, i) => {
        let date = new Date(c.commit.author.date);

        commits[i].date =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
      });
    });

  function selectBranch(name) {
    selectedBranch = name;
    branchSelectOpen = false;

    pluginService
      .getGitCommitsByBranch(selectedBranch, addr)
      .then((data: any[]) => {
        commits = data;
        commits.map((c, i) => {
          let date = new Date(c.commit.author.date);

          commits[i].date =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();
        });
      });
  }
</script>

{#if notFound}
  <div class="notFound">
    C'è stato un errore nel caricamento della repository!
  </div>
{/if}

{#if open}
  <div
    class="close"
    in:scale={{ duration: 300 }}
    on:click={() => {
      open = false;
      branchSelectOpen = false;
    }}
  >
    Chiudi
  </div>
  <div class="open">
    <div class="header">
      <div class="name">{repo}</div>
      {#if description}
        <div class="description">{description}</div>
      {/if}
    </div>
    <div class="menu">
      {#if readme}
        <div class="readme" on:click={() => (commitsOpen = false)}></div>
        <div class="commit" on:click={() => (commitsOpen = true)}></div>
      {/if}
    </div>
    <div class="content">
      {#if commitsOpen}
        <div class="branches">
          <div
            class="selectedBranch"
            on:click={() => (branchSelectOpen = !branchSelectOpen)}
          >
            {selectedBranch}
          </div>
          {#if branchSelectOpen}
            <div class="select">
              {#each branches as branch, i}
                <div
                  class={"branch" +
                    (selectedBranch === branch.name ? " current" : "")}
                  in:scale={{ duration: 200, delay: i * 100 }}
                  on:click={() => selectBranch(branch.name)}
                >
                  {branch.name}
                </div>
              {/each}
            </div>
          {/if}
        </div>

        {#if commits}
          <div class="commits">
            {#each commits as commit, i}
              <div
                class={"commit"}
                in:scale={{ duration: 300, delay: i * 100 }}
              >
                <div class="author">
                  <img
                    class="propic"
                    src={commit.author.avatar_url}
                    alt={commit.author.login}
                  />
                </div>

                <div class="message">
                  <div class="text">
                    {emoji.replace_colons(commit.commit.message)}
                  </div>
                  <div class="name">
                    - {commit.author.login}
                  </div>
                  <div class="date">
                    {commit.date}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          loading
        {/if}
      {:else}
        <div class="readme" in:scale={{ duration: 300 }}>
          {@html marked(readme)}
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="content">
    <div class="commits">
      {#each commits as commit, i}
        {#if i < commitPerPlugin}
          <div
            class={"commit" + (i !== 0 ? " more" : "")}
            style={`top: ${i * 20}px;` +
              `z-index: ${commitPerPlugin - i};` +
              `transform: scale(${0.85 + (commitPerPlugin - i) * 0.05});`}
            on:click={() => (i < commitPerPlugin ? (open = true) : "")}
          >
            <div class="author">
              <img
                class="propic"
                src={commit.author.avatar_url}
                alt={commit.author.login}
              />
            </div>

            <div class="message">
              <div class="text">
                {emoji.replace_colons(commit.commit.message)}
              </div>
              <div class="name">- {commit.author.login}</div>
              <div class="date">
                {commit.date}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./git.scss";
</style>
