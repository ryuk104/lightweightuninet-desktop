<script>
  import {
    isReceiver,
    isSender,
    partnerSDP,
    partnerSocketId,
    partnerStream,
    partnerVideoSettings,
    peer,
    socket,
    userSocketId,
    userStream,
    userVideoCallSettings,
  } from "$lib/utils/store";

  import { Row, Col, Card, Button, Icon } from "svelte-materialify";

  import { mdiPhoneHangup, mdiMicrophone, mdiMicrophoneOff } from "@mdi/js";
  import { onDestroy, onMount } from "svelte";
  import useVideo from "$lib/utils/useVideo";
  import { createPeer } from "$lib/utils/webrtc";
  import { goto } from "$app/navigation";

  $: mobile = false;
  onMount(async () => {
    try {
      let breakpoints = await import(
        "svelte-materialify/src/utils/breakpoints"
      );
      breakpoints = breakpoints.default;

      // check if screen size is less than or equal to medium
      mobile = window.matchMedia(breakpoints["md-and-down"]).matches;

      let streamData = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      $userStream = streamData;

      if ($isReceiver) {
        $peer = createPeer();
        const desc = new RTCSessionDescription($partnerSDP);
        $peer
          .setRemoteDescription(desc)
          .then(() => {
            $userStream
              .getTracks()
              .forEach((track) => $peer.addTrack(track, $userStream));
          })
          .then(() => {
            return $peer.createAnswer();
          })
          .then((answer) => {
            return $peer.setLocalDescription(answer);
          })
          .then(() => {
            const payload = {
              to: $partnerSocketId,
              from: $userSocketId,
              sdp: $peer.localDescription,
            };
            $socket.emit("answer", payload);
          });
      }

      if ($isSender) {
        const peerData = createPeer();
        $peer = peerData;
        $userStream
          .getTracks()
          .forEach((track) => $peer.addTrack(track, $userStream));
      }
    } catch (error) {
      console.log(error);
    }
  });

  onDestroy(() => {
    if ($userStream) {
      $socket.emit("disconnected");
      $userStream.getTracks().forEach((track) => track.stop());
      window.location.reload();
    }
  });

  function handleEndCall() {
    $socket.emit("disconnected");
    goto("/meet");
    window.location.reload();
  }
</script>

<svelte:head>
  <tittle> videocall </tittle>
</svelte:head>
<Row>
  <Col cols={12}>
    <h6 class="text-center mb-3">{$partnerSocketId}</h6>
    <Card style="width:100%;height:70vh;position: relative;">
      {#if $partnerStream}
        <video
          style="width: 100%;height: 100%;position: relative;"
          use:useVideo={$partnerStream}
          muted={$partnerVideoSettings.muteAudio}
          playsinline
          controls={false}
          autoplay
        >
          <track kind="captions" />
        </video>

        <Button
          fab
          icon
          size="small"
          class="blue"
          style="position: absolute;left:0;bottom:0"
          on:click={() =>
            ($partnerVideoSettings.muteAudio = !$partnerVideoSettings.muteAudio)}
        >
          <Icon
            path={$partnerVideoSettings.muteAudio
              ? mdiMicrophoneOff
              : mdiMicrophone}
          />
        </Button>
      {/if}
      <div style="position: absolute;bottom: 0;right: 0;">
        <Card
          style={mobile
            ? "width:100px;height: 100px"
            : "width:200px;height: 200px"}
        >
          {#if $userStream}
            <video
              style="width:100%;height: 100%;position: relative;"
              use:useVideo={$userStream}
              muted={$userVideoCallSettings.muteAudio}
              playsinline
              controls={false}
              autoplay
            >
              <track kind="captions" />
            </video>

            <Button
              fab
              icon
              size="x-small"
              class="blue"
              style="position: absolute;right:0;bottom:0"
              on:click={() =>
                ($userVideoCallSettings.muteAudio = !$userVideoCallSettings.muteAudio)}
            >
              <Icon
                path={$userVideoCallSettings.muteAudio
                  ? mdiMicrophoneOff
                  : mdiMicrophone}
              />
            </Button>
          {/if}
        </Card>
      </div>
      <Button
        class="red"
        fab
        icon
        on:click={handleEndCall}
        style="position:absolute;bottom:0;left:40%"
      >
        <Icon path={mdiPhoneHangup} />
      </Button>
    </Card>
  </Col>
</Row>
