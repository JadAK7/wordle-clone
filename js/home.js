import { dictionary } from "./words.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector("[data-grid]");
  const word = dictionary[Math.floor(Math.random() * dictionary.length)];

  const startup = function () {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
  };

  const stop = function () {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("click", handleClick);
  };

  const handleKeyDown = function (e) {
    if (e.key === "Enter") submitWord();

    if (e.key === "Backspace") deleteLetter();

    if (e.key.match(/^[a-z]$/)) addLetter(e.key);

    return;
  };

  const handleClick = function (e) {
    if (e.target.matches("[data-enter]")) submitWord();

    if (e.target.matches("[data-delete]")) deleteLetter();

    if (e.target.matches("[data-letter]")) addLetter(e.target.dataset.letter);

    return;
  };

  const getActiveSquares = function () {
    return grid.querySelectorAll(`[data-active="true"]`);
  };

  const addLetter = function (letter) {
    const activeSquares = getActiveSquares();
    if (activeSquares.length >= 5) return;
    const square = grid.querySelector(":not([data-key])");
    square.dataset.key = letter;
    square.textContent = letter;
    square.dataset.active = true;
  };

  const deleteLetter = function () {
    const activeSquares = getActiveSquares();
    const activeSquare = activeSquares[activeSquares.length - 1];
    activeSquare.textContent = "";
    delete activeSquare.dataset.key;
    delete activeSquare.dataset.active;
  };

  const submitWord = async function () {
    const squares = [...getActiveSquares()];
    const guess = squares.reduce((word, letter) => {
      return word + letter.dataset.key;
    }, "");
    if (!dictionary.includes(guess)) {
      return alert("not a word");
    }
    checkWord(squares, guess);
  };

  const checkWord = function (squares, guess) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === squares[i].dataset.key) flipTileGreen(squares[i]);
      else if (word.includes(squares[i].dataset.key))
        flipTileYellow(squares[i]);
      else flipTileRed(squares[i]);
    }
    if (word === guess) {
      alert("CONGRATS!!!!!");
      stop();
    }
  };

  const flipTileRed = function (letter) {
    letter.style.backgroundColor = "red";
    letter.dataset.active = false;
  };
  const flipTileGreen = function (letter) {
    letter.style.backgroundColor = "green";
    letter.dataset.active = false;
  };
  const flipTileYellow = function (letter) {
    letter.style.backgroundColor = "yellow";
    letter.dataset.active = false;
  };

  console.log(word);
  startup();
});
