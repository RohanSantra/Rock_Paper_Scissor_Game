// ==== Game State Variables ====
let userScore = 0;
let computerScore = 0;
let roundCount = 1;
let totalRounds = 0;
let userChoice = null;

const CHOICES = ['rock', 'paper', 'scissor'];
const WIN_MAP = {
    rock: 'scissor',
    paper: 'rock',
    scissor: 'paper'
};

// ==== DOM Elements ====
const el = {
    mainScreen: document.querySelector(".main-screen"),
    roundSelection: document.querySelector(".round-selection"),
    gameArea: document.querySelector(".game-area"),
    quitMenu: document.querySelector(".quit"),
    overlay: document.querySelector(".overlay"),
    warningMsg: document.querySelector(".warningMsg"),
    roundOverMsg: document.querySelector(".roundOverMsg"),
    endMsg: document.querySelector(".endMsg"),
    userEndScore: document.querySelector(".userEndScore"),
    computerEndScore: document.querySelector(".computerEndScore"),
    userScoreEl: document.querySelector(".user-score"),
    computerScoreEl: document.querySelector(".computer-score"),
    runningRoundEl: document.querySelector(".running"),
    userChoiceImg: document.querySelector(".play-image .user-image"),
    computerChoiceImg: document.querySelector(".play-image .computer-image"),
    msgEl: document.querySelector(".msg"),
    totalRoundEl: document.querySelector(".total-round"),

    // Buttons
    playBtn: document.querySelector(".play"),
    playAgainBtn: document.querySelector(".play-again"),
    selectRoundAgainBtn: document.querySelector(".select-round-again"),
    exitBtn: document.querySelector(".exit"),
    quitIcon: document.querySelector(".quitIcon"),
    yesBtn: document.querySelector(".yes"),
    noBtn: document.querySelector(".no"),
    warningMsgCloseIcon: document.querySelector(".warningMsgcloseIcon"),

    // Choice buttons
    choiceButtons: document.querySelectorAll(".select-btn h3"),
    roundCards: document.querySelectorAll(".selection-card")
};

// ==== Utility Functions ====
function show(elm) {
    elm.classList.add('display');
}

function hide(elm) {
    elm.classList.remove('display');
}

function computerChoiceGenerator() {
    const idx = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[idx];
}

function handleDraw() {
    updateMessage(`It's a Draw`, "#BFCBC2");
}

function updateMessage(text, color) {
    el.msgEl.innerHTML = text;
    el.msgEl.style.backgroundColor = color;
    el.msgEl.parentElement.style.borderColor = color;
}

function handleMsg(userWin, userChoice, computerChoice) {
    const message = userWin
        ? `You Win !!! ${userChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}`
        : `You Lose !!! ${userChoice.toUpperCase()} loses to ${computerChoice.toUpperCase()}`;
    const color = userWin ? "#8ac926" : "#f94144";
    updateMessage(message, color);
}

function updateScore(userWin) {
    if (userWin) {
        userScore++;
        el.userScoreEl.innerHTML = userScore;
    } else {
        computerScore++;
        el.computerScoreEl.innerHTML = computerScore;
    }
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundCount = 1;
    userChoice = null;

    el.userScoreEl.innerHTML = 0;
    el.computerScoreEl.innerHTML = 0;
    el.runningRoundEl.innerHTML = 1;
    el.userChoiceImg.innerHTML = '';
    el.computerChoiceImg.innerHTML = '';
    updateMessage("Select which hand you want to play", "#BFCBC2");
}

function showRoundOver() {
    show(el.overlay);
    el.roundOverMsg.style.display = "flex";
    el.userEndScore.innerHTML = userScore;
    el.computerEndScore.innerHTML = computerScore;

    const userWon = userScore > computerScore;
    el.roundOverMsg.classList.toggle('roundWinMsg', userWon);
    el.roundOverMsg.classList.toggle('roundLoseMsg', !userWon);
    el.endMsg.innerHTML = userWon ? "Congratulation!!! You Won 😀😀😀" : "Unfortunately, You Lose 😭😭😭";
}

function quitGame() {
    if (getComputedStyle(el.gameArea).display === 'flex' && getComputedStyle(el.roundOverMsg).display === 'none') {
        el.quitMenu.classList.toggle('display');
        el.overlay.classList.toggle('display');
    }
}

// ==== Core Logic ====
function checkResult() {
    if (!userChoice) {
        show(el.warningMsg);
        show(el.overlay);
        return
    }

    const computerChoice = computerChoiceGenerator();
    el.computerChoiceImg.innerHTML = `<img src="./images/${computerChoice}.png">`;

    let userWin = false;
    if (userChoice === computerChoice) {
        handleDraw();
    } else {
        userWin = WIN_MAP[userChoice] === computerChoice;
        roundCount++;
        el.runningRoundEl.innerHTML = roundCount;
        handleMsg(userWin, userChoice, computerChoice);
        updateScore(userWin);
    }

    userChoice = null;

    if (roundCount - 1 === totalRounds) {
        el.runningRoundEl.innerHTML = roundCount - 1;
        showRoundOver();
    }
}

// ==== Setup Functions ====
function setupGame() {
    el.choiceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            userChoice = btn.className.toLowerCase();
            el.userChoiceImg.innerHTML = `<img src="./images/${userChoice}.png">`;
            el.computerChoiceImg.innerHTML = '';
        });
    });

    el.playBtn.addEventListener("click", checkResult);

    el.playAgainBtn.addEventListener("click", () => {
        hide(el.overlay);
        el.roundOverMsg.style.display = "none";
        resetGame();
    });

    el.selectRoundAgainBtn.addEventListener("click", () => {
        hide(el.overlay);
        el.roundOverMsg.style.display = "none";
        el.gameArea.style.display = "none";
        el.roundSelection.style.display = "flex";
    });

    el.exitBtn.addEventListener("click", () => {
        hide(el.overlay);
        el.roundOverMsg.style.display = "none";
        el.gameArea.style.display = "none";
        el.mainScreen.style.display = "flex";
    });

    el.quitIcon.addEventListener("click", quitGame);
    el.yesBtn.addEventListener("click", () => {
        hide(el.overlay);
        hide(el.quitMenu);
        el.gameArea.style.display = "none";
        el.mainScreen.style.display = "flex";
    });
    el.noBtn.addEventListener("click", () => {
        hide(el.overlay);
        hide(el.quitMenu);
    });

    el.warningMsgCloseIcon.addEventListener("click", () => {
        hide(el.overlay);
        hide(el.warningMsg);
    });

    // ESC key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (getComputedStyle(el.quitMenu).display === 'none' && getComputedStyle(el.warningMsg).display === 'none') {
                quitGame();
            }
            else if (getComputedStyle(el.warningMsg).display === 'flex') {
                hide(el.warningMsg);
                hide(el.overlay);
            }
        }
    });

    // Phone/browser back button
    window.history.pushState({ page: 1 }, "", "");
    window.addEventListener("popstate", () => {
        quitGame();
        window.history.pushState({ page: 1 }, "", "");
    });
}

function selectRound() {
    el.roundCards.forEach(card => {
        card.addEventListener("click", () => {
            el.roundSelection.style.display = "none";
            el.gameArea.style.display = "flex";
            totalRounds = Number(card.dataset.round);
            el.totalRoundEl.innerHTML = totalRounds;
            resetGame();
        });
    });
}

function startGame() {
    const startBtn = document.querySelector(".start");
    startBtn.addEventListener("click", () => {
        el.mainScreen.style.display = "none";
        el.roundSelection.style.display = "flex";
    });
    selectRound();
}

// ==== Initialize Game ====
setupGame();
startGame();
