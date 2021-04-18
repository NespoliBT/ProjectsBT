<script lang="ts">
  import { ipcRenderer } from "electron";
  import { fly } from "svelte/transition";

  let popupShow: boolean;
  let popupInfo: string;
  let downloading: boolean;
  let progress = 0;

  ipcRenderer.on("message", (event, params) => {
    switch (params.message) {
      case "checkingForUpdate":
        console.log("Checking for update...");
        break;

      case "updateAvailable":
        popupShow = true;
        popupInfo = "É disponibile un aggiornameto";
        setTimeout(() => {
          popupShow = false;
        }, 2000);
        break;

      case "updateError":
        popupShow = true;
        popupInfo = "Errore nell'aggiornamento!";
        setTimeout(() => {
          popupShow = false;
        }, 2000);
        break;

      case "downloadProgress":
        popupShow = true;
        downloading = true;
        popupInfo = "Aggiornando...";
        progress = params.data;
        console.log(params.data);
        break;

      case "updateDownloaded":
        popupShow = true;
        downloading = false;
        popupInfo = "Aggiornamento scaricato!";
        setTimeout(() => {
          popupShow = false;
        }, 2000);
        break;
      default:
        break;
    }
  });
</script>

{#if popupShow}
  <div class="updater" in:fly={{ x: 200 }} out:fly={{ x: 200 }}>
    <div class="info">{popupInfo ? popupInfo : ""}</div>
    {#if downloading}
      <input
        class="loading"
        type="range"
        min="0"
        max="100"
        disabled
        value={progress}
      />
    {/if}
  </div>
{/if}

<!-- 
    Todo
        - checkingForUpdate
        - updateAvailable
        - updateNotAvailable
        - updateError
        - downloadProgress
        - updateDownloaded
-->
<style lang="scss">
  @import "./updater.scss";
</style>
