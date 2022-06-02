<script>

    let playlistname = "dsadsads";
    let playlistartist = "dsdjoa";
    let playlistimage = "https://audio.liberta.vip/media/__sized__/attachments/a8/14/72/cover-crop-c0-5__0-5-200x200-95.jpg"
</script>
  

<div class="body">
        
    <h1>Recently played</h1>
    <ul class="playlists-list"> 
        <div class="playlist">
            <img src={playlistimage} alt="playlist" width="80%" height="80%">
            {playlistname}
            {playlistartist}
        </div>

        <div class="playlist">
            <img src={playlistimage} alt="playlist" width="80%" height="80%">
            {playlistname}
            {playlistartist}
        </div>
    </ul>

    <div class="minimusicplayer"> 
        <div class="musiccard">

          <div class="musiccardimage">
            <img src="https://audio.liberta.vip/media/__sized__/attachments/a8/14/72/cover-crop-c0-5__0-5-200x200-95.jpg" class="musiccardimage" width="5%" hieght="5%" alt="d">
          </div>

          <div class="musiccardtext">
            <div class="musiccardtexttitle">
              <a href="artist"> 
                <h1>Reve de toi</h1>
              </a>
            </div>

            <div class="musiccardtextartist">
              <a href="artist">
                <h4> 徒 setto セット </h4>
              </a>
            </div>
          </div>
        </div>

        <div class="trackcontroll">
          <button title="Prevous track"> </button>
          <button title="play"> </button>
          <button title="Next track"> </button>
        </div>

        <div class="trackoption">
          <button title="volume"> </button>
          <button title="repeat"> </button>
          <button title="shuffle"> </button>
        </div>

        <div class="tracktimeline">
          <div data-percents="100" style="width:100%"></div>
          <div data-percents="100" style="width:100%"></div>
        </div>

    </div>

</div>

<style>

    .body{
    background: #18191A !important;
    margin: 0;
    padding: 0;
    color: var(--text);
    background: var(--bg);
    transition: background 500ms ease-in-out, color 1000ms ease-in-out;
    width: 100%;
    height: 100%;

    }

    .playlists-list{
        display:grid;
        background: #18191A;
        margin: 0;
        padding: 0;
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;    
        position: fixed;
        margin-left: 10%;
}

    .playlist{
        background: #0b253f;
        height: 200px;
        width: 20%;
    }
    
.minimusicplayer{
  position: fixed;
  width: 100%;
  height: 15%;
  left: 0px;
  bottom: 0px;
  background-color: #21c700;
}

.musiccardtext{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: -6%;
  padding-left: 6%;
}
</style>