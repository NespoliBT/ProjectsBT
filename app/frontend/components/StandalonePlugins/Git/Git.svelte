<script lang="ts">
  const marked = require("marked");
  import { scale } from "svelte/transition";
  import { gitService } from "../../../services/pluginServices/gitService";
  import Loading from "../../Atoms/Loading/Loading.svelte";

  const EmojiConvertor = require("emoji-js");
  const emoji = new EmojiConvertor();
  emoji.replace_mode = "unified";
  emoji.allow_native = true;

  import type { InputT } from "../../../types/types";
  export let inputs: InputT[];

  const commitPerPlugin = 3;
  let open = false;
  let notFound: boolean;
  let commitsOpen = true;
  let branchSelectOpen = false;

  const addr = inputs[0]?.value;
  const id = inputs[1]?.value;

  let readme: string,
    commits = [],
    branches = [],
    selectedBranch = "",
    branchID: string,
    flavour: string,
    repoName: string,
    repoDescription: string;

  flavour = id ? "gitlab" : "github";

  gitService
    .getGitInfo(addr, flavour, id)
    .then(
      (data: { readme: any; repoName: string; repoDescription: string }) => {
        readme = data.readme;
        repoDescription = data.repoDescription;
        repoName = data.repoName;
      }
    )
    .catch((e) => {
      notFound = true;
    });

  gitService.getGitBranches(addr, flavour, id).then((data) => {
    branches = data.reverse();

    selectedBranch = branches[0].name;
    branchID = flavour == "gitlab" ? branches[0].commit.id : selectedBranch;

    gitService
      .getGitCommitsByBranch(branchID, addr, id, flavour)
      .then((data) => {
        commits = data;
      });
  });

  function selectBranch(branch) {
    selectedBranch = branch.name;

    branchSelectOpen = false;
    commits = [];

    gitService
      .getGitCommitsByBranch(selectedBranch, addr, id, flavour)
      .then((data: any[]) => {
        commits = data;
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
      <div class="name">{repoName}</div>
      {#if repoDescription}
        <div class="description">{repoDescription}</div>
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
                  on:click={() => selectBranch(branch)}
                >
                  {branch.name}
                </div>
              {/each}
            </div>
          {/if}
        </div>

        {#if commits[0]}
          <div class="commits">
            {#each commits as commit, i}
              <div
                class={"commit"}
                in:scale={{ duration: 300, delay: i * 100 }}
              >
                <div class="author">
                  <img
                    class="propic"
                    src={commit.author_avatar}
                    alt={commit.author_name}
                  />
                </div>

                <div class="message">
                  <div class="text">
                    {emoji.replace_colons(commit.title)}
                  </div>
                  <div class="name">
                    - {commit.author_name}
                  </div>
                  <div class="date">
                    {commit.date}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <Loading />
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
      {#if commits[0]}
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
                  src={commit.author_avatar}
                  alt={commit.author_name}
                />
              </div>

              <div class="message">
                <div class="text">
                  {emoji.replace_colons(commit.title)}
                </div>
                <div class="name">- {commit.author_name}</div>
                <div class="date">
                  {commit.date}
                </div>
              </div>
            </div>
          {/if}
        {/each}
      {:else}
        <Loading />
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./git.scss";
</style>
