<script>
import { goto } from '$app/navigation';

  let channelId = "";
  let username = "";

  const handleJoin = () => {
    goto(`/server/channel/${channelId}?user=${username}`);
  };
</script>

<div>
  <div>
    <span>Channel</span>
    <input bind:value={channelId} type="text" />
  </div>
  <div>
    <span>Username</span>
    <input bind:value={username} type="text" />
  </div>
  <button on:click={handleJoin}>Join !</button>
</div>
