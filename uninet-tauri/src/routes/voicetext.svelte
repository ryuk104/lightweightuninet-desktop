<script>
    import {browser} from '$app/env'

    import VoiceRecogination from "$lib/Components/voicetext/VoiceRecogination/VoiceRecogination.svelte";
    console.clear();

</script>

<main>
  <header>Voice Notes</header>
  <div class="container">
    <div class="recording__box">
      <VoiceRecogination />
    </div>

  </div>
</main>
  
<style>
  .container {
      text-align: center;
      padding: 0 50px;
    }
    header {
      background: #355c7d;
      padding: 0 15px;
      color: white;
      height: 50px;
      line-height: 50px;
      font-size: 2rem;
    }
    .recording__box {
      margin-top: 70px;
    }

    @import url("https://fonts.googleapis.com/css?family=Fira+Sans");
html,
body {
  position: relative;
  min-height: 100vh;
  background-color: #f67280;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  color: white;
}
a {
  color: rgb(0, 100, 200);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

* {
  box-sizing: border-box;
}
</style>
