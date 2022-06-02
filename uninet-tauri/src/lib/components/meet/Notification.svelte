<script>
  import { goto } from "$app/navigation";

  import {
    isReceivingCall,
    partnerSocketId,
    socket,
    userSocketId,
  } from "$lib/utils/store";

  import { Snackbar, Button,Icon } from "svelte-materialify";
  import {mdiPhoneHangup,mdiPhone} from "@mdi/js"

  function handleAnswer() {
    $isReceivingCall = false;
    goto("/meet/videocall");
  }

  function handleReject() {
    $socket.emit("offer_reject", { from: $userSocketId, to: $partnerSocketId });
    window.location.reload();
  }
</script>

<Snackbar
  class="flex-column"
  style="position: absolute;top:50px"
  bind:active={$isReceivingCall}
  top
  right
>
  <h6>Incomming Call from {$partnerSocketId}</h6>
  <div class="mt-4">
    <Button rounded class="green mr-3" on:click={handleAnswer}>
      <Icon path={mdiPhone} class="mr-2" />
      Accept
    </Button>
    <Button rounded class="red" on:click={handleReject}>
    <Icon path={mdiPhoneHangup} class="mr-2"/>
    Decline
    </Button>
  </div>
</Snackbar>
