<script>
  import Notification from "$lib/components/meet/Notification.svelte";
  import { onMount } from "svelte";
  import { MaterialApp, Container } from "svelte-materialify";
  import {
    socket,
    peer,
    partnerSocketId,
    userSocketId,
    partnerStream,
    isReceivingCall,
    isReceiver,
    partnerSDP,
    isSender,
  } from "$lib/utils/store";
  import { server } from "$lib/utils/config";
  import { dev } from "$app/env";
  import { goto } from "$app/navigation";

  onMount(async () => {
    try {
      const io = await import("socket.io-client");
      let BASE_URL = dev ? server.dev : server.prod;
      $socket = io.default(BASE_URL);
    } catch (error) {
      console.log(error);
    }
  });

  // peer events

  $: if ($peer) {
    $peer.onicecandidate = handleICECandidateEvent;
    $peer.ontrack = handleTrackEvent;
    $peer.onnegotiationneeded = handleNegotiationNeededEvent;
  }

  function handleTrackEvent(e) {
    $partnerStream = e.streams[0];
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        to: $partnerSocketId,
        candidate: e.candidate,
      };
      $socket.emit("ice-candidate", payload);
    }
  }

  function handleNegotiationNeededEvent() {
    $peer
      .createOffer()
      .then((offer) => {
        return $peer.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          to: $partnerSocketId,
          from: $userSocketId,
          sdp: $peer.localDescription,
        };
        $socket.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  // socket events

  $: if ($socket) {
    $socket.on("offer", handleRecieveCall);

    $socket.on("answer", handleAnswer);

    $socket.on("ice-candidate", handleNewICECandidateMsg);

    $socket.on("me", (data) => {
      $userSocketId = data;
    });

    $socket.on("user_disconnect", () => {
      goto("/meet");
      window.location.reload();
    });

    $socket.on("offer_rejected", (data) => {
      goto("/meet");
      window.location.reload();
    });
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);
    $peer.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleAnswer(message) {
    console.log("handle answer", message);
    const desc = new RTCSessionDescription(message.sdp);
    $peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    console.log("handle receive call", incoming);
    $isReceivingCall = true;
    $isSender = false;
    $isReceiver = true;
    $partnerSocketId = incoming.from;
    $partnerSDP = incoming.sdp;
  }
</script>

<svelte:head>
  <meta name="description" content="Sveltemeet video calling web app in sveltekit and webrtc" />
</svelte:head>

<MaterialApp theme="dark">
  <div class="root">
    <header>
    </header>

    <main>
      <Container>
        <slot />
      </Container>
    </main>

    <div>
    </div>
  </div>
  <Notification />
</MaterialApp>

<style>
  .root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
