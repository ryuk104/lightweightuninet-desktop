import { writable } from "svelte/store";

export const userStream = writable(null);
export const partnerStream = writable(null);

export const userSocketId = writable("");
export const partnerSocketId = writable("");

export const partnerSDP = writable(null);

export const socket = writable(null);
export const peer = writable(null);

export const isSender = writable(false);
export const isReceiver = writable(false);
export const isReceivingCall = writable(false);
export const isVideoCallAccepted = writable(false);

// settings

export const userVideoCallSettings = writable({ muteAudio: true });
export const partnerVideoSettings = writable({ muteAudio: true });
