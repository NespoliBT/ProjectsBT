<script lang="ts">
  import { fly } from "svelte/transition";
  import { shell } from "electron";
  import { configService } from "../../services/configService";

  let openConfig = false;
  const configs = ["placeholder", "gitlab"];
  let selectedConfig = configs[0];

  function selectConfig(config) {
    selectedConfig = selectedConfig == config ? null : config;
    setTimeout(() => {
      const inputs = document.querySelectorAll("input.input");
      inputs.forEach((input: HTMLInputElement) => {
        configService.get(input.name).then((value: string) => {
          
          input.value = value ? value : "";
        });
      });
    }, 100);
  }

  function saveConfig(e) {
    e.preventDefault();
    let nameValueMap = new Map();
    const children = e.target.children;

    for (const el of children) {
      if (el.classList.contains("input")) {
        nameValueMap.set(el.getAttribute("name"), el.value);
      }
    }

    configService.set([...nameValueMap]);
  }
</script>

<div class="configBtn" on:click={() => (openConfig = true)}></div>

{#if openConfig}
  <div class="configOverlay" in:fly={{ x: -500 }} out:fly={{ x: -500 }}>
    <div class="sidebar">
      <div class="title">Impostazioni</div>
      <ul>
        <li on:click={() => selectConfig("gitlab")}>GitLab</li>
      </ul>
    </div>
    <div class="content">
      {#if selectedConfig === "gitlab"}
        <div
          class="config"
          in:fly={{ x: -500 }}
          out:fly={{ x: openConfig ? 1000 : -500 }}
        >
          <div class="title">GitLab</div>
          <div class="description">
            Qui puoi inserire le preferenze per GitLab.
          </div>
          <form on:submit={(e) => saveConfig(e)}>
            <input
              type="text"
              placeholder="Private Token"
              class="input"
              name="gitlab"
            />
            <button type="submit"></button>
            <div class="info">
              <div
                class="link"
                on:click={() =>
                  shell.openExternal(
                    "https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html"
                  )}
              >
                Come ottenere il proprio token
              </div>
            </div>
          </form>
        </div>
      {:else}
        <div
          class="placeholder"
          in:fly={{ x: -500 }}
          out:fly={{ x: openConfig ? 1000 : -500 }}
        >
          
        </div>
      {/if}
    </div>
    <div
      class="close"
      on:click={() => {
        openConfig = false;
        selectedConfig = configs[0];
      }}
    >
      
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./config.scss";
</style>
