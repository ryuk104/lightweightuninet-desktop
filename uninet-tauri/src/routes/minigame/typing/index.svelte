

<script>
	import randomWords from "random-words";
	let word = randomWords();
	let words = generateWords();
	let text = "";

	let correct = 0;
	let total = 0;
	let totalChars = 0;

	let started = false;
	let time = 0;
	let timeLimit = 30;
	let timerID;
	let wpm = 0;

	function generateWords() {
	  let words = [];
	  for (let i = 0; i < 5; i++) {
	    words.push(randomWords());
	  }
	  return words;
	}
	function generateWord() {
	  let temp = words.filter((v, i) => i !== 0);
	  temp.push(randomWords());
	  words = temp;
	}
	function startTimer() {
	  if (started === true) {
	    return;
	  }
	  started = true;
	  timerID = setInterval(() => {
	    time++;
	    if (time >= timeLimit) {
	      clearInterval(timerID);
	      displayResults();
	    }
	  }, 1000);
	}

	function displayResults() {
	  // take the total characters / 5

	  wpm = (totalChars / 5 / (timeLimit / 60)) * (correct / total);
	  wpm = Math.round(wpm);
	}

	function reset() {
	  time = 0;
	  clearInterval(timerID);
	  correct = 0;
	  wpm = 0;
	  total = 0;
	  started = false;
	}
	function checkWord(event) {
	  if (started === false) {
	    startTimer();
	  }
	  let e = event.target.value;
	  if (e.substring(e.length - 1) === " " && time !== 30) {
	    if (e.substring(0, e.length - 1) === words[0]) {
	      correct++;
	    }
	    total++;
	    totalChars += e.length;
	    text = "";
	    generateWord();
	  }
	}
	// alter the checkWord and also display the words
	// from the words state onto our website
	// - now we compare our input against the first value of words
	// - display the words in a meaningful way on our screen

	// set up our timer so that it automatically ends after a
	// certain amount of time (ex. 60 seconds)

	// WPM

	// (total / timeLimit) * (correct / total) => temporary WPM
</script>

<style>
	* {
	  box-sizing: border-box;
	}
	.word-container {
	  display: flex;
	}
	.word {
	  margin: 10px;
	}
	main {
	  height: 100vh;
	  width: 100vw;
	}
</style>

<main>
	<div class="word-container">
		{#each words as v,i}
			<div class="word">{v}</div>
		{/each}
	</div>
	<h2>Time: {time}</h2>
	<h2>Result: {wpm} WPM</h2>
	<button on:click={() => startTimer()}>Start</button>
	<button on:click={() => reset()}>Reset</button>
	<h2>{correct} : {total} </h2>
	<input bind:value={text} on:input={(ev) => checkWord(ev)} disabled={false ? true : false}/>
</main>