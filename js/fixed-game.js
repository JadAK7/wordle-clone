import { dictionary, targetWords } from "./words.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector("[data-grid]");
  const word = targetWords[Math.floor(Math.random() * targetWords.length)];

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
      shakeTiles(squares);
      return showAlert("not a word");
    }
    checkWord(squares, guess);
  };

  const checkWord = function (squares, guess) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === squares[i].dataset.key)
        setTimeout(() => {
          flipTileGreen(squares[i], i, squares[i].dataset.key);
        }, 300);
      else if (word.includes(squares[i].dataset.key))
        setTimeout(() => {
          flipTileYellow(squares[i]);
        }, 300);
      else
        setTimeout(() => {
          flipTileRed(squares[i]);
        }, 300);
    }
    if (word === guess) {
      danceTiles(squares);
      showAlert("CONGRATS!!!!!");
      stop();
    }
    const remainingSquares = grid.querySelectorAll(":not([data-key])");
    if (remainingSquares.length === 0) {
      showAlert(word);
      stop();
    }
  };

  const flipTileRed = function (letter) {
    letter.style.backgroundColor = "grey";
    letter.dataset.active = false;
  };
  const flipTileGreen = function (letter, i, key) {
    const letters = grid.querySelectorAll(`[data-col="${i + 1}"]`);
    for (let lett of letters) {
      lett.style.backgroundColor = "green";
      lett.dataset.key = key;
      lett.textContent = key;
      lett.dataset.active = false;
    }
  };
  const flipTileYellow = function (letter) {
    letter.style.backgroundColor = "yellow";
    letter.dataset.active = false;
  };

  const showAlert = function (message, duration = 3000) {
    const alert = document.createElement("div");
    const alertContainer = document.querySelector("[data-alert-container]");
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    if (duration == null) return;
    setTimeout(() => {
      alert.classList.add("hide");
      alert.remove();
    }, duration);
  };

  const danceTiles = function (tiles) {
    tiles.forEach((tile, index) => {
      tile.classList.add("dances");
    });
  };

  const shakeTiles = function (tiles) {
    tiles.forEach((tile) => {
      tile.classList.add("shake");
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("shake");
        },
        { once: true }
      );
    });
  };

  console.log(word);

  startup();
});
