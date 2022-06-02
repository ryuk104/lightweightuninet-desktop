<script>
  import { goto } from "$app/navigation";
  import { isSender, partnerSocketId } from "$lib/utils/store";

  import {
    Button,
    Card,
    TextField,
    CardText,
    CardActions,
    Icon,
  } from "svelte-materialify";

  import { mdiPhone } from "@mdi/js";

  let sveltezoomId = "";

  function handleSendVideoCall() {
    $isSender = true;
    $partnerSocketId = sveltezoomId;
    goto("/meet/videocall");
  }
</script>

<Card style="width:100%;min-height:250px" class="pa-6">
  <CardText>
    <h4 class="mb-6">Enter sveltezoom Id and Call</h4>
    <TextField bind:value={sveltezoomId} />
  </CardText>
  <CardActions>
    <Button
      size="x-large"
      block
      on:click={handleSendVideoCall}
      rounded
      outlined
    >
      <Icon path={mdiPhone} class="mr-3" />
      Call
    </Button>
  </CardActions>
</Card>
