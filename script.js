// ---- Declare everything ONCE at the top ----
const mainScreen = document.querySelector(".main-screen");
const RoundSelection = document.querySelector(".round-selection");
const gameArea = document.querySelector(".game-area");
const Quit = document.querySelector(".quit");
const quitIcon = document.querySelector('.ri-close-large-line');
const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');
const userScoreEl = document.querySelector('.user-score');
const computerScoreEl = document.querySelector('.computer-score');
const runningRoundEl = document.querySelector('.running');
const computerChoiceImg = document.querySelector(".play-image .computer-image");
const userChoiceImg = document.querySelector(".play-image .user-image");
const msgEl = document.querySelector(".msg");
const playBtn = document.querySelector(".play");
const overlay = document.querySelector(".overlay");
const roundOverMsg = document.querySelector(".roundOverMsg");
const roundWinMsg = document.querySelector(".roundWinMsg");
const roundLoseMsg = document.querySelector(".roundLoseMsg");
const endMsg = document.querySelector(".endMsg");
const userEndScore = document.querySelector(".userEndScore");
const computerEndScore = document.querySelector(".computerEndScore");
const playAgain = document.querySelector(".play-again");
const totalRoundEl = document.querySelector(".total-round");
const selectRoundAgain = document.querySelector(".select-round-again");
const exit = document.querySelector(".exit");

const Choices = document.querySelectorAll(".select-btn h3");

let userScore = 0;
let computerScore = 0;
let roundCount = 1;
let totalRounds = 0;
let userChoice = null;

// ---- Utility Functions ----
function computerChoiceGenerator() {
    const choices = ['rock', 'paper', 'scissor'];
    const randIdx = Math.floor(Math.random() * choices.length);
    return choices[randIdx];
}

function handleDraw() {
    msgEl.innerHTML = `It's a Draw`;
    msgEl.style.backgroundColor = "#BFCBC2";
    msgEl.parentElement.style.borderColor = "#BFCBC2";
}

function quitGame() {
    if (gameArea.style.display === 'flex' && getComputedStyle(roundOverMsg).display === 'none') {
        Quit.classList.toggle('display');
        overlay.classList.toggle('display');

    }
}

function handleMsg(userWin, userChoice, computerChoice) {
    if (userWin) {
        msgEl.innerHTML = `You Win !!! ${userChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}`;
        msgEl.style.backgroundColor = "#8ac926";
        msgEl.parentElement.style.borderColor = "#8ac926";
    } else {
        msgEl.innerHTML = `You Lose !!! ${userChoice.toUpperCase()} loses to ${computerChoice.toUpperCase()}`;
        msgEl.style.backgroundColor = "#f94144";
        msgEl.parentElement.style.borderColor = "#f94144";
    }
}

function updateScore(userWin) {
    if (userWin) {
        userScore++;
        userScoreEl.innerHTML = userScore;
    } else {
        computerScore++;
        computerScoreEl.innerHTML = computerScore;
    }
}

function showRoundOver() {
    overlay.classList.add('display')
    roundOverMsg.style.display = "flex";
    userEndScore.innerHTML = userScore;
    computerEndScore.innerHTML = computerScore;

    if (userScore > computerScore) {
        roundOverMsg.classList.add('roundWinMsg');
        roundOverMsg.classList.remove('roundLoseMsg');
        endMsg.innerHTML = "Congratulation!!! You Won 😀😀😀";
    } else {
        roundOverMsg.classList.remove('roundWinMsg');
        roundOverMsg.classList.add('roundLoseMsg');
        endMsg.innerHTML = "Unfortunatly, You Lose 😭😭😭";

    }
}

// ---- Core Game Logic ----
function checkResult() {
    if (!userChoice) {
        alert("Please select Rock, Paper, or Scissor before playing!");
        return;
    }

    const computerChoice = computerChoiceGenerator();
    computerChoiceImg.innerHTML = `<img src="./images/${computerChoice}.png">`;

    let userWin = false;

    if (userChoice === computerChoice) {
        handleDraw();
    } else {
        if (userChoice === 'rock') userWin = (computerChoice === 'scissor');
        else if (userChoice === 'paper') userWin = (computerChoice === 'rock');
        else if (userChoice === 'scissor') userWin = (computerChoice === 'paper');
        roundCount++;
        runningRoundEl.innerHTML = roundCount;
        handleMsg(userWin, userChoice, computerChoice);
        updateScore(userWin);
    }

    if ((roundCount - 1) === totalRounds) {
        runningRoundEl.innerHTML = roundCount - 1;
        showRoundOver();
    }
}

// ---- Reset Game ----
function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundCount = 1;
    userChoice = null;

    userScoreEl.innerHTML = userScore;
    computerScoreEl.innerHTML = computerScore;
    runningRoundEl.innerHTML = roundCount;
    userChoiceImg.innerHTML = '';
    computerChoiceImg.innerHTML = '';

    msgEl.innerHTML = "Select which hand you want to play";
    msgEl.style.backgroundColor = "#BFCBC2";
    msgEl.parentElement.style.borderColor = "#BFCBC2";
}

// ---- Setup Once ----


function setupGame() {
    // Choice buttons
    Choices.forEach(choice => {
        choice.addEventListener('click', () => {
            userChoice = choice.className.toLowerCase();
            computerChoiceImg.innerHTML = '';
            userChoiceImg.innerHTML = `<img src="./images/${userChoice}.png">`;
        });
    });

    // Play button
    playBtn.addEventListener("click", () => {
        checkResult();
    });

    // Play Again button
    playAgain.addEventListener("click", () => {
        overlay.classList.remove('display');
        roundOverMsg.style.display = "none";
        resetGame();
    });

    //Select round button
    selectRoundAgain.addEventListener('click', () => {
        overlay.classList.remove('display');
        roundOverMsg.style.display = "none";
        gameArea.style.display = "none";
        RoundSelection.style.display = "flex";
    });

    //Exit button
    exit.addEventListener("click", () => {
        overlay.classList.remove('display');
        roundOverMsg.style.display = "none";
        gameArea.style.display = "none";
        mainScreen.style.display = "flex";
    });

    // ESC key to quit game
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            quitGame();
        }
    });

    //close button on quit menu
    quitIcon.addEventListener('click', () => {
        quitGame();
    })

    //Yes button on quit menu
    yesBtn.addEventListener('click', () => {
        overlay.classList.remove('display');
        Quit.classList.remove('display')
        gameArea.style.display = "none";
        mainScreen.style.display = "flex";
    });

    //No button on quit menu
    noBtn.addEventListener('click', () => {
        overlay.classList.remove('display');
        Quit.classList.remove('display');
    })

    //triggering exit menu when going back in phone or browser
    window.history.pushState({ page: 1 }, "", "");
    window.addEventListener('popstate', function (event) {
        // console.log(
        //     `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
        // );
        quitGame();
        window.history.pushState({ page: 1 }, "", "");
    });

}



// ---- Game Flow ----
function selectRound() {
    const rounds = document.querySelectorAll(".selection-card");

    rounds.forEach(roundCard => {
        roundCard.addEventListener("click", function () {
            RoundSelection.style.display = "none";
            gameArea.style.display = "flex";
            totalRounds = Number(roundCard.dataset.round);
            totalRoundEl.innerHTML = totalRounds;
            resetGame();
        });
    });
}

function startGame() {
    const start = document.querySelector(".start");
    start.addEventListener("click", function () {
        mainScreen.style.display = "none";
        RoundSelection.style.display = "flex";
    });

    selectRound();
}



// ---- Initialize ----
setupGame();
startGame();
