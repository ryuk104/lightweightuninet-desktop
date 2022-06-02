<script lang="ts" context="module">
	import { trackPageview } from '$lib/components/minigame/wordle/plausible'
	import { locales, loadTranslations, getNavigatorLanguage } from '$lib/components/minigame/wordle/translations'
	import { storedLocale } from '$lib/components/minigame/wordle/store'
	import type { Load } from '@sveltejs/kit'
	import { get } from 'svelte/store'
	import { browser } from '$app/env'
	export const load: Load = async () => {
		if (!browser) {
			await loadTranslations('en')
			return {}
		}
		let initialLocale = get(storedLocale)
		if (!initialLocale) initialLocale = getNavigatorLanguage()
		if (!locales.get().includes(initialLocale)) initialLocale = 'en'
		storedLocale.set(initialLocale)
		await loadTranslations(initialLocale)
		return {}
	}
	trackPageview()
</script>

<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { highContrast, dyslexicFont } from '$lib/components/minigame/wordle/store'
</script>

<svelte:head>
	{#if $highContrast}
		<style>
			body {
				--before-color: #da3f8b;
				--correct-color: #64ba2e;
				--primary-color: #000;
				--secondary-color: #0e1118;
				--tertiary-color: #161a25;
			}
		</style>
	{/if}
	{#if $dyslexicFont}
		<style>
			@font-face {
				font-family: 'OpenDyslexic-Regular';
				src: url('font/OpenDyslexic-Regular.woff') format('woff');
			}
			body {
				font-family: OpenDyslexic-Regular, var(--font-list);
				font-size: 0.9em;
			}
		</style>
	{/if}
</svelte:head>

<div id="main">
	<SvelteToast options={{ intro: { y: 0 }, duration: 2000 }} />
	<slot />
</div>

<style>
	#main {
		max-width: 528px;
		margin: 0 auto;
	}
	:root {
	--font-list: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
	Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-family: var(--font-list);
	--primary-color: #161a25;
	--secondary-color: #221c2e;
	--tertiary-color: #312236;
	--accent-color: #d363b1;
	--cta-color: #2d52b6;
	--correct-color: #15a850;
	--error-color: #ac2847;
	--before-color: #e38f2f;
	--after-color: #567de8;
	--heading-color: rgba(255, 255, 255, 0.8);
	--text-color: #cccccc;
	--toastContainerLeft: calc(50vw - 8rem);
	--toastContainerTop: 2rem;
	--toastContainerRight: auto;
	--toastBarHeight: 0;
	--toastBackground: var(--tertiary-color);
	--toastMsgPadding: 0.75rem 2rem;
}

body,
html {
	margin: 0;
	padding: 0;
}

body {
	color: var(--text-color);
	background: var(--tertiary-color);
	transition: background 150ms ease-out
}

#svelte {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

h1,
h2,
h3,
p {
	font-weight: 400;
	color: var(--heading-color);
}

p {
	line-height: 1.5;
}

a {
	color: var(--accent-color);
	text-decoration: none;
	font-weight: bold;
}

a:hover {
	text-decoration: underline;
}

h1 {
	font-size: 1.6rem;
	text-align: center;
}

input,
button {
	cursor: pointer;
	font-size: inherit;
	font-family: inherit;
}

button {
	color: var(--text-color);
	background: var(--primary-color);
}

button:focus:not(:focus-visible) {
	outline: none;
}

@media (min-width: 480px) {
	h1 {
		font-size: 1.8rem;
	}
}

</style>
