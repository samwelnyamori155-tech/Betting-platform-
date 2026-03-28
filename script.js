let balance = 1000;
let bet = 0;

let currentMultiplier = 1;
let crashPoint = 0;
let gameRunning = false;
let interval;

// Canvas
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// Sounds
const tickSound = document.getElementById("tickSound");
const crashSound = document.getElementById("crashSound");
const cashSound = document.getElementById("cashSound");

// Resize canvas
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let time = 0;
let history = [];

// Draw graph
function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  for (let i = 0; i <= time; i++) {
    let x = i * 5;
    let y = canvas.height - Math.pow(1.05, i) * 5;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = gameRunning ? "#00ff9f" : "red";
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Update history UI
function updateHistory(value) {
  history.unshift(value.toFixed(2) + "x");

  if (history.length > 10) history.pop();

  let container = document.getElementById("historyList");
  container.innerHTML = "";

  history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";
    div.innerText = item;
    container.appendChild(div);
  });
}

// Fake multiplayer players
function fakePlayers() {
  console.log("👥 Players betting...");
}

// Start game
function placeBet() {
  if (gameRunning) return;

  bet = parseInt(document.getElementById("betAmount").value);

  if (!bet || bet > balance) {
    alert("Invalid bet");
    return;
  }

  balance -= bet;
  document.getElementById("balance").innerText = "Balance: " + balance;

  currentMultiplier = 1;
  time = 0;
  gameRunning = true;

  crashPoint = Math.random() * 5 + 1;

  fakePlayers();

  interval = setInterval(() => {
    time++;
    currentMultiplier = Math.pow(1.05, time);

    document.getElementById("multiplier").innerText =
      currentMultiplier.toFixed(2) + "x";

    drawGraph();

    // play ticking sound
    tickSound.currentTime = 0;
    tickSound.play();

    if (currentMultiplier >= crashPoint) {
      crashGame();
    }

  }, 100);
}

// Crash
function crashGame() {
  clearInterval(interval);
  gameRunning = false;

  document.getElementById("multiplier").innerText = "CRASH 💥";
  document.getElementById("multiplier").style.color = "red";

  crashSound.play();

  updateHistory(currentMultiplier);

  drawGraph();

  setTimeout(() => {
    document.getElementById("multiplier").innerText = "1.00x";
    document.getElementById("multiplier").style.color = "#00ff9f";
  }, 2000);
}

// Cash out
function cashOut() {
  if (!gameRunning) return;

  clearInterval(interval);
  gameRunning = false;

  let win = Math.floor(bet * currentMultiplier);
  balance += win;

  document.getElementById("balance").innerText = "Balance: " + balance;

  cashSound.play();

  updateHistory(currentMultiplier);

  alert("Cashed out at " + currentMultiplier.toFixed(2) + "x");
    }
