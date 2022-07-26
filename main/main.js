const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    // getting randomm object ftom wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // getting word of random mobject
    maxGuesses = 5; corrects = []; incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects ;

    let html = "";
    for(let i =0; i<word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key)) { // not same letter twice
        if(word.includes(key)) { // if entered letter found in the word
           for(let i =0; i<word.length; i++) {
            // showing matched letter in the input value
            if(word[i] === key) {
                corrects.push(key);
                inputs.querySelectorAll("input")[i].value = key;
            }
          }
        } else {
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = ""; 

    setTimeout(() => {
        if(corrects.length === word.length) {
            alert(`Congrats🥳 You found the word ${word.toUpperCase()}`);
            randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over ! Not enough Guesses");
            for(let i =0; i<word.length; i++) {
                // showing matched letter in the input value
               inputs.querySelectorAll("input")[i].value = word[i];
              }
        }
    });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
