import { get } from 'svelte/store'
import * as store from './/store'
import {
	createNewBoard,
	getBoardRowString,
	getValidLetterBounds,
	hasEnoughLetters,
	isValidWord,
	loadDictionary,
	WORD_LENGTH,
} from './data-model'
import { t } from './translations'
import { trackEvent } from './plausible'
import { toast } from '@zerodevx/svelte-toast'
import type { SvelteToastOptions } from '@zerodevx/svelte-toast'
import { saveGameDetail, recordGuessTime } from './stats'

export function resetBoard() {
	toast.pop()
	store.boardContent.set(createNewBoard())
	store.currentTile.set(0)
	store.invalidWord.set(false)
	store.invalidWordPreview.set(false)
	store.invalidHardModeGuess.set(false)
	store.notEnoughLetters.set(false)
	store[get(store.gameMode) === 'daily' ? 'guessTimesDaily' : 'guessTimesRandom'].set([])
}

export function typeLetter(letter: string) {
	if (get(store.gameFinished)) {
		store.openScreen.set('results')
		return
	}
	loadDictionary().catch((e) => {
		showError(get(t)('main.messages.need_reload'), () => {}, 8000)
	})
	const _currentTile = get(store.currentTile)
	if (_currentTile === WORD_LENGTH) return
	const _currentRow = get(store.currentRow)
	if (_currentRow === 0 && _currentTile === 0) recordGuessTime(_currentRow)
	store.boardContent.update((content) => {
		const tile = content[_currentRow][_currentTile]
		const [lower, upper] = getValidLetterBounds(get(store.validLetters))
		tile.polarity = 0
		if (letter && letter < lower) {
			tile.polarity = -1
		} else if (letter && letter > upper) {
			tile.polarity = 1
		}
		tile.letter = letter
		return content
	})
	store.notEnoughLetters.set(false)
	store.invalidWordPreview.set(false)
	if (letter || _currentTile < WORD_LENGTH - 1) {
		store.currentTile.update((ct) => ct + 1)
		const typedWord = getBoardRowString(get(store.boardContent)[_currentRow])
		if (typedWord.length === WORD_LENGTH) {
			loadDictionary().then(async () => {
				if (typedWord !== get(store.answer) && !(await isValidWord(typedWord))) {
					store.invalidWordPreview.set(true)
				}
			})
		}
	}
}

export function undoLetter(moveCaratBack = true) {
	if (get(store.gameFinished)) {
		store.openScreen.set('results')
		return
	}
	store.boardContent.update((content) => {
		let tile = content[get(store.currentRow)][get(store.currentTile)]
		if (moveCaratBack && get(store.currentTile) > 0 && !tile?.letter) {
			store.currentTile.update((ct) => ct - 1)
			tile = content[get(store.currentRow)][get(store.currentTile)]
		}
		tile.letter = ''
		tile.polarity = 0
		return content
	})
	store.invalidHardModeGuess.set(false)
	store.notEnoughLetters.set(false)
	store.invalidWord.set(false)
	store.invalidWordPreview.set(false)
}

export function moveCarat(dir: number) {
	if (get(store.gameFinished)) {
		store.openScreen.set('results')
		return
	}
	const moveTo = get(store.currentTile) + dir
	if (moveTo < 0 || moveTo >= WORD_LENGTH) return
	store.currentTile.update((ct) => ct + dir)
}

let submitting = false
export async function submitRow() {
	if (submitting) return
	if (get(store.gameFinished)) {
		store.openScreen.set('results')
		return
	}
	submitting = true
	const rowNumber = get(store.currentRow)
	if (!hasEnoughLetters(get(store.boardContent), rowNumber)) {
		store.notEnoughLetters.set(true)
		showError(get(t)('main.messages.not_enough_letters'), () => store.notEnoughLetters.set(false))
		submitting = false
		return
	}
	const submittedRow = get(store.boardContent)[rowNumber]
	const submittedWord = getBoardRowString(submittedRow)
	let validWord: boolean
	try {
		validWord = await isValidWord(submittedWord)
	} catch (e) {
		showError(get(t)('main.messages.need_reload'), () => {}, 8000)
		submitting = false
		return
	}
	if (submittedWord !== get(store.answer) && !validWord) {
		store.invalidWord.set(true)
		showError(get(t)('main.messages.invalid_word'), () => store.invalidWord.set(false))
		submitting = false
		return
	}
	if (
		get(store.hardMode) &&
		rowNumber > 0 &&
		submittedRow.some(
			(tile) => tile.letter < tile.letterBounds![0] || tile.letter > tile.letterBounds![1]
		)
	) {
		store.invalidHardModeGuess.set(true)
		showError(get(t)('main.messages.use_valid_letters'), () =>
			store.invalidHardModeGuess.set(false)
		)
		submitting = false
		return
	}
	trackEvent('submitGuess')
	recordGuessTime(rowNumber + 1)
	store.updateGuesses((words) => [...words, submittedWord])
	if (get(store.gameFinished)) {
		setTimeout(() => {
			store.openScreen.set('results')
		}, 1700)
		const won = get(store.gameWon)
		trackEvent(won ? 'gameWon' : 'gameLost')
		if (get(store.newUser)) trackEvent('firstFinish')
		store.newUser.set(false)
		const gameMode = get(store.gameMode)
		store[gameMode === 'daily' ? 'lastPlayedDailyWasHard' : 'lastPlayedRandomWasHard'].set(
			get(store.hardMode)
		)
		if (gameMode === 'daily')
			store.stats.update((_stats) => {
				const streak = won ? _stats.currentStreak + 1 : 0
				const distribution = [..._stats.distribution]
				distribution[get(store.guesses).length - 1]++
				return {
					currentStreak: streak,
					bestStreak: streak > _stats.bestStreak ? streak : _stats.bestStreak,
					totalGames: _stats.totalGames + 1,
					wonGames: _stats.wonGames + (won ? 1 : 0),
					distribution,
				}
			})
		saveGameDetail()
	} else {
		store.currentTile.set(0)
	}
	submitting = false
}

const showError = (m: string, onPop?: (id?: number) => any, duration?: number) => {
	toast.pop()
	const toastOptions: SvelteToastOptions = {
		theme: { '--toastBackground': 'var(--error-color)' },
	}
	if (onPop) toastOptions.onpop = onPop
	if (duration !== undefined) toastOptions.duration = duration
	toast.push(m, toastOptions)
}
