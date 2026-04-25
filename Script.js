let rn = 0;
let score = 0;
let timer = 60;
let playgame = true;
let timerInterval; // Timer ko rokne ke liye variable

const pbtm = document.querySelector("#pbtm");
const restartScreen = document.querySelector("#restartScreen");
const finalScoreText = document.querySelector("#finalScoreText");
const restartBtn = document.querySelector("#restartBtn");

// 🎯 Bubbles Banane ka function
function makeBubble() {
    let clutter = "";
    // Hum screen size ke hisab se bubbles generate kar rahe hain (approx 100)
    for (let i = 1; i <= 102; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${randomNum}</div>`;
    }
    pbtm.innerHTML = clutter;
}

// ⏱ Timer Function
function startTimer() {
    // Agar pehle se timer chal raha ho to use band karein
    clearInterval(timerInterval);
    
    timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timervalue").textContent = timer;
        } else {
            clearInterval(timerInterval);
            playgame = false;
            showGameOver();
        }
    }, 1000);
}

// 🎯 Hit number generator
function getNewHit() {
    rn = Math.floor(Math.random() * 10);
    document.querySelector("#Hitbox").textContent = rn;
}

// 🧮 Score generator
function updateScore() {
    score += 10;
    document.querySelector("#Scorebox").textContent = score;
}

// 💀 Game Over screen show karna
function showGameOver() {
    pbtm.innerHTML = ""; // Bubbles saaf karo
    finalScoreText.textContent = `Your Score: ${score}`;
    restartScreen.style.display = "flex"; // Restart screen dikhao
}

// 🖱 Click Handling
pbtm.addEventListener("click", function (details) {
    if (playgame && details.target.classList.contains("bubble")) {
        let clickedNum = Number(details.target.textContent);
        if (clickedNum === rn) {
            updateScore();
            getNewHit();
            makeBubble();
        }
    }
});

// 🚀 Start / Restart function
function startGame() {
    score = 0;
    timer = 60 // Aap test ke liye ise 5 ya 10 kar sakte hain
    playgame = true;

    // UI Reset
    restartScreen.style.display = "none";
    document.querySelector("#Scorebox").textContent = score;
    document.querySelector("#timervalue").textContent = timer;

    getNewHit();
    makeBubble();
    startTimer();
}

// Restart button click event
restartBtn.addEventListener("click", function() {
    startGame();
});

// Pehli baar game start karna
startGame();