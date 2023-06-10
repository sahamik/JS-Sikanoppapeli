

let players = [];
let currentPlayerIndex = 0;
let currentPlayerScore = 0;
let playersCountInput = document.getElementById("playersCount");


// Pelaajien tietojen luomisen funktio
function createInputs() {
    let playersCount = parseInt(playersCountInput.value);
    let playerInputs = document.getElementById("playerInputs");

    // Asetetaan input kentät tyhjiksi
    playerInputs.innerHTML = "";

    if (playersCount === 0) {
      let message = document.createElement("p");
      message.textContent = "Lisää pelaaja!";
      message.classList.add("error");
      playerInputs.appendChild(message);
      document.getElementById("startGameBtn").style.display = "none";
    } else {
      for (let i = 1; i <= playersCount; i++) {
        let playerNameInput = document.createElement("input");
        playerNameInput.type = "text";
        playerNameInput.name = "player" + i;
        playerNameInput.placeholder = "Pelaaja " + i + " nimi";
        playerInputs.appendChild(playerNameInput);
        playerInputs.appendChild(document.createElement("br"));
      }
      document.getElementById("startGameBtn").style.display = "block";
    }
  }

    // Pelin aloitus funktio
function startGame() {
    let playerInputsContainer = document.getElementById("playerInputs");
    let playerInputs = playerInputsContainer.getElementsByTagName("input");
    let errorMessagesContainer = document.getElementById("errorMessages");
    players = [];

    // Virheilmoitukset tyhjäksi
    errorMessagesContainer.innerHTML = "";


    for (let i = 0; i < playerInputs.length; i++) {
      let input = playerInputs[i];
      let playerName = input.value.trim();

      if (playerName !== "") {
          players.push({
              name: playerName,
              score: 0
          });
      } else {
        let msg = document.createElement("p");
        msg.textContent = "Anna pelaajan nimi!";
        msg.className = "error-message";
        msg.classList.add("error");
        errorMessagesContainer.appendChild(msg);
        return;
      }
    }

    playerInputsContainer.style.display ="none";
    document.getElementById("startGameBtn").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("rulesSection").style.display = "none";
    document.getElementById("playersSection").style.display = "none";
      
    updateScores();
    updateCurrentPlayer();
    removeDice();
    rollDice();

    // Jos valitaan peli kahdella nopalla, niin palautetaan toinen noppa näkyviin
    let diceCount = document.getElementById("diceCount").value;
    if (diceCount === "2") {
      restoreDice();
    }
    return;
}

// Jos valitaan peli kahdella nopalla, niin tällä voidaan poistaa pelkistä toinen noppa näkyvistä
function removeDice() {
  document.getElementById("dice2").style.display = "none";
}

// Tällä palautetaan toinen noppa näkyviin jos halutaan pelata kahdella nopalla
function restoreDice() {
  document.getElementById("dice2").style.display = "inline"
}

// Vuorossa olevan pelaajan näyttämisen funktio
function updateCurrentPlayer() {
  let currentPlayer = players[currentPlayerIndex];

  document.getElementById("currentPlayer").textContent = "Vuorossa " + currentPlayer.name;
  updateScores();
}

// Pisteiden päivitys funktio
function updateScores () {
  let scores = document.getElementById("score");
  scores.innerHTML = "";

  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let scoreElement = document.createElement("div");
    scoreElement.textContent = player.name + ": " + player.score;
    scores.appendChild(scoreElement);
  }
}

// Nopan heitto funktio
function rollDice() {
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = 0;
  let diceImg1 = "/images/D" + dice1 + ".png";
  let diceImg2 = "/images/D" + dice2 + ".png";

  if (diceCount.value === "2") {
    dice2 = Math.floor(Math.random() * 6) + 1;
    diceImg2 = "/images/D" + dice2 + ".png";
  }
    if (dice1 === dice2) {
      currentPlayerScore = currentPlayerScore + 25;
    }
    else if (dice1 === 1 && dice2 === 1) {
      currentPlayerScore = currentPlayerScore + (dice1 + dice2) * 2;
    }
    else if (dice1 === 1 || dice2 === 1) {
      endTurn();
    } else {
      currentPlayerScore = currentPlayerScore + dice1 + dice2;
    }
    
    document.getElementById("dice1").setAttribute("src", diceImg1);
    document.getElementById("dice2").setAttribute("src", diceImg2);
}




// Heittovuoron päättämisen funktio
function endTurn() {
  players[currentPlayerIndex].score = players[currentPlayerIndex].score + currentPlayerScore;
  currentPlayerScore = 0;

  if(players[currentPlayerIndex].score >= 100) {
    alert("Onnittelut, " + players[currentPlayerIndex].name + "! Voitit pelin!")
    reset();
    restart();
    document.getElementById("restartBtn").style.display = "block";
  } else {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
    document.getElementById("rollBtn").style.display = true;
    document.getElementById("endTurnBtn").style.display = true;
  }
}

// Uusi peli funktio
function restart() {
  reset();
  createInputs();

  // Asetetaan input kentät tyhjiksi
  playerInputs.innerHTML = "";

  document.getElementById("gameSection").style.display = "none";
  document.getElementById("rulesSection").style.display = "block";
  document.getElementById("playerInputs").style.display = "block";

  let playersSection = document.getElementById("playersSection");
  let startGameBtn = document.getElementById("startGameBtn");
  let restartBtn = document.getElementById("restartBtn");

  let dice = "/images/d6.gif";
  document.getElementById("dice1").setAttribute("src", dice);


  playersCountInput.value = "0";
  playersSection.style.display = "block";
  startGameBtn.style.display = "block";
  restartBtn.style.display = "block";

}

// Pelin alustus funktio
function reset() {
  players = [];
  currentPlayerIndex = 0;
  currentPlayerScore = 0;

  document.getElementById("playerInputs").innerHTML = "";
  document.getElementById("gameSection").style.display = "none";
  document.getElementById("playersSection").style.display = "block";
}