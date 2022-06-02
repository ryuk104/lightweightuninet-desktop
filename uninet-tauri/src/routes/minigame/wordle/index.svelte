<script lang="ts">
	import { onMount } from 'svelte'
	import { get } from 'svelte/store'
	import Board from '$lib/components/minigame/wordle/Board.svelte'
	import Keyboard from '$lib/components/minigame/wordle/Keyboard.svelte'
	import Results from '$lib/components/minigame/wordle/Results.svelte'
	import Tutorial from '$lib/components/minigame/wordle/Tutorial.svelte'
	import Options from '$lib/components/minigame/wordle/Options.svelte'
	import {
		getDayNumber,
		getWordByDay,
		decodeWord,
		encodeWord,
		getRandomWord,
	} from '$lib/components/minigame/wordle/data-model'
	import * as store from '$lib/components/minigame/wordle/store'
	import { browser } from '$app/env'
	import { page } from '$app/stores'
	import Footer from '$lib/components/minigame/wordle/Footer.svelte'
	import Header from '$lib/components/minigame/wordle/Header.svelte'
	import { resetBoard } from '$lib/components/minigame/wordle/board'

	const { openScreen, gameMode } = store

	onMount(async () => {
		if (!get(store.answerDaily) && !get(store.answerRandom)) {
			store.newUser.set(true)
			openScreen.set('tutorial')
		}
		await startGame()
	})

	let hash = get(page).url.hash?.slice(1)
	const wordFromHash = decodeWord(hash)
	gameMode.set(wordFromHash ? 'random' : 'daily')

	async function startGame() {
		if (!wordFromHash) {
			if (get(store.lastPlayedDaily) < getDayNumber()) await playDaily()
		} else if (wordFromHash !== get(store.answerRandom)) {
			await playRandom(wordFromHash)
		}
		if (get(store.gameFinished)) setTimeout(() => openScreen.set('results'), 1700)
	}

	async function playRandom(word?: string) {
		const randomWord = word || (await getRandomWord())
		hash = encodeWord(randomWord)
		history.pushState(
			'',
			document.title,
			window.location.pathname + `#${hash}` + window.location.search
		)
		// window.location.hash = encodeWord(randomWord)
		resetBoard()
		store.guessesRandom.set([])
		store.answerRandom.set(randomWord)
	}

	async function playDaily() {
		history.pushState('', document.title, window.location.pathname + window.location.search) // Remove # from URL
		if (get(store.lastPlayedDaily) === getDayNumber() && get(store.gameFinished)) return
		resetBoard()
		store.guessesDaily.set([])
		const dayNumber = getDayNumber()
		store.lastPlayedDaily.set(dayNumber)
		store.answerDaily.set(await getWordByDay(dayNumber))
	}

	let consoleMode: boolean
	if (browser)
		window.wp_start = () => {
			consoleMode = true
		}
</script>

<div>
	<div class:minimized={$openScreen !== null}>
		<section>
			<Header />
			<Board />
			<Keyboard />
			{#if consoleMode}
				{#await import('$lib/components/minigame/wordle/Console.svelte') then c}
					<svelte:component this={c.default} />
				{/await}
			{/if}
		</section>
		<Footer />
	</div>
	{#if $openScreen === 'options'}
		<Options />
	{:else if $openScreen === 'tutorial'}
		<Tutorial />
	{:else if $openScreen === 'results'}
		<Results
			{hash}
			playDaily={() => {
				openScreen.set(null)
				gameMode.set('daily')
				playDaily()
			}}
			playRandom={() => {
				openScreen.set(null)
				gameMode.set('random')
				playRandom()
			}}
		/>
	{/if}
</div>

<style>
	.minimized {
		height: 0;
		overflow: clip;
	}
</style>
