
function runGame() {
  const choices = ["rock", "paper", "scissors"];
    const buttons = document.querySelectorAll("button");
    const playerScoreElement = document.querySelector(".scoreSide span:nth-child(3) h1:nth-child(2)");
    const computerScoreElement = document.querySelector(".scoreSide span:nth-child(1) h1:nth-child(2)");
    const resultElement = document.querySelector(".scoreSide span:nth-child(2) h1");
    resultElement.style.display = "none";
    const immediateResult = document.querySelector(".immediateResult h1");
    immediateResult.style.display = "none";
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;
    const maxMoves = 5;
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        if (moves < maxMoves) {
          const playerChoice = button.id;
          const computerChoice = choices[Math.floor(Math.random() * 3)];
          
          displayChoices("rock", "rock");
          const playerImage = document.getElementById("player-rock");
          const computerImage = document.getElementById("computer-rock");
          playerImage.classList.add("shake-player");
          computerImage.classList.add("shake-computer");

      // Delay the image change and score update
          setTimeout(() => {
        // Remove animation class after animation completes
            playerImage.classList.remove("shake-player");
            computerImage.classList.remove("shake-computer");

        // Update to actual choices
            displayChoices(playerChoice, computerChoice);

            const result = determineWinner(playerChoice, computerChoice);
            updateScores(result);
            immediateResult.textContent = result === "player" ? "You win!" : result === "computer" ? "Computer wins!" : "It's a draw!";
            immediateResult.style.display = "block";

            moves++;
            if (moves === maxMoves) {
              declareOverallWinner();
              immediateResult.style.display = "none";
            }
          }, 600);
        }
      });
    });

    
    function determineWinner(player, computer) {
      if (player === computer) {
        return "draw";
      } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
      ) {
        return "player";
      } else {
        return "computer";
      }
    }
  
    function updateScores(result) {
      if (result === "player") {
        playerScore++;
        playerScoreElement.textContent = playerScore;
      } else if (result === "computer") {
        computerScore++;
        computerScoreElement.textContent = computerScore;
      }
    }
  
    function displayChoices(player, computer) {
      const gestureSide = document.querySelector(".gestureSide");
      gestureSide.innerHTML = `
        <img src="./${player} left.png" alt="${player}" id="computer-${computer}"/>
        <img src="./${computer} right.png" alt="${computer}" id="player-${player}" />
      `;
    }
  
    function declareOverallWinner() {
      if (playerScore > computerScore) {
        resultElement.textContent = "Player wins the game!";
        resultElement.style.display = "block";
      } else if (computerScore > playerScore) {
        resultElement.textContent = "Computer wins the game!";
        resultElement.style.display = "block";
      } else {
        resultElement.textContent = "It's a draw!";
      }
      buttons.forEach(button => button.disabled = true);
    }
}

document.addEventListener("DOMContentLoaded", runGame);