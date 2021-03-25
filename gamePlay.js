function createAlphabet(startChar) {
	// get ASCII code of symbol to start:
	const startCharASCII = startChar.charCodeAt();

	// generate next 26 (for English) codes for each letter.
	const alphabetCodes = Array.from( Array(26).keys() ).map( (el,i)=> i+startCharASCII);

	// convert each ASCII code to respective symbol:
	const alphabet = alphabetCodes.map( el=> String.fromCharCode(el));

	return alphabet;
}

function showBoard() {
	dom.board.innerHTML = gameBoard.map( el=> `<span>${el}</span>`).join(' ');
}

function showUserChoices() {
	// wrap each userChoice in a span, setting class as 'used' or 'unused'
	dom.alphabet.innerHTML = userChoices.map(
		el=> `<span class="${el[1]?'used':'unused'}">${el[0]}</span>`
	).join(' ');
}

function updateUserChoices(letter) {
	// mark as used the letter in userChoices array
	userChoices.forEach( el=>{
		if(el[0]===letter.toUpperCase()){
			el[1]=true;
		}
	})

	showUserChoices();
}

function updateBoard(matches,letter) {
	// replace each matched position in board array with the letter
	for (const match of matches) {
		gameBoard.splice(match.index,1,letter);
	}

	showBoard();
}

function guess(letter) {
	// find all matches (and their indexes) of letter in wordToGuess
	let matches = wordToGuess.matchAll(new RegExp(letter,"gi"));
	updateBoard(matches,letter);
}


const wordToGuess = "orinoko";

// array of currently guessed letters. Each un-guessed letter is displayed as '_'
let gameBoard = wordToGuess.replace(/\w/g,'_').split('');

// all possible letters for user to choose from:
const alphabet = createAlphabet('A');

// 2dim array [letter, bool], marking a used letter with true, unused with false
const userChoices = alphabet.map( el=>[el,false]);
// console.log(`userChoices: ${userChoices}`);

const dom = {
	'board':document.querySelector('.board'),
	'alphabet':document.querySelector('.alphabet'),
}

dom.alphabet.addEventListener('click',function(e) {
	const letter = e.target.innerText;
	guess(letter);
	updateUserChoices(letter);
})

window.onload= function() {
	showUserChoices();
	showBoard()
}