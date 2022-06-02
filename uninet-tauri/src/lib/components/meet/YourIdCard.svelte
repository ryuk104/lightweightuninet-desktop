<script>
  import { userSocketId } from "$lib/utils/store";

  import { Card, CardText } from "svelte-materialify";
</script>

<Card style="width:100%;min-height:250px" class="pa-6 text-center">
  <CardText>
    <h4 class="mb-2">Your sveltezoom Id</h4>
    <p class="mb-6">Send sveltezoom Id to your friends to connect and call</p>
    <div style="border:1px solid grey;border-radius: 30px" class="pa-2">
      <h5>{$userSocketId}</h5>
    </div>
  </CardText>
</Card>
