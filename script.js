let balance = 1000;
let currentMultiplier = 1;
let gameRunning = false;
let crashPoint = 0;
let interval;

function placeBet() {
  if (gameRunning) return;

  gameRunning = true;
  currentMultiplier = 1;

  // Random crash between 1x and 10x
  crashPoint = (Math.random() * 9 + 1).toFixed(2);

  interval = setInterval(() => {
    currentMultiplier += 0.05;

    document.getElementById("multiplier").innerText =
      currentMultiplier.toFixed(2) + "x";

    if (currentMultiplier >= crashPoint) {
      clearInterval(interval);
      gameRunning = false;
      alert("💥 Crashed at " + crashPoint + "x");
    }

  }, 100);
}

function cashOut() {
  if (!gameRunning) return;

  clearInterval(interval);
  gameRunning = false;
let bet = 0;

function placeBet() {
  if (gameRunning) return;

  bet = parseInt(document.getElementById("betAmount").value);

  if (!bet || bet > balance) {
    alert("Invalid bet");
    return;
  }

  balance -= bet;
  document.getElementById("balance").innerText = "Balance: " + balance;

  gameRunning = true;
  currentMultiplier = 1;

  crashPoint = (Math.random() * 9 + 1).toFixed(2);

  interval = setInterval(() => {
    currentMultiplier += 0.05;

    document.getElementById("multiplier").innerText =
      currentMultiplier.toFixed(2) + "x";

    if (currentMultiplier >= crashPoint) {
      clearInterval(interval);
      gameRunning = false;
      alert("💥 Crashed at " + crashPoint + "x");
    }

  }, 100);
}

function cashOut() {
  if (!gameRunning) return;

  clearInterval(interval);
  gameRunning = false;

  let win = Math.floor(bet * currentMultiplier);
  balance += win;

  document.getElementById("balance").innerText =
    "Balance: " + balance;

  alert("✅ Cashed out at " + currentMultiplier.toFixed(2) + "x");
}


  

  let win = Math.floor(currentMultiplier * 10);
  balance += win;

  document.getElementById("balance").innerText =
    "Balance: " + balance;

  alert("✅ Cashed out at " + currentMultiplier.toFixed(2) + "x");
}
