import { Player } from "./player.js";
import { drawBoard } from "./viewController.js";
import { gameState } from "./globals.js";

import './style.css';

function computerTurn(onComplete) {
    const computerLoop = setInterval(() => {
        let randRow;
        let randCol;
        do {
            randRow = Math.floor(Math.random() * 10);
            randCol = Math.floor(Math.random() * 10);
        } while (player.gameboard.board[randRow][randCol] === 'm' ||
                player.gameboard.board[randRow][randCol] === 'x'  ||
                player.gameboard.board[randRow][randCol] === 'sunk');

        const hitShip = player.gameboard.receiveAttack(randRow, randCol);
        drawBoard(player);

        // CASE: computer wins
        if (player.gameboard.allShipsSunk()) {
            clearInterval(computerLoop); // Stop the interval
            end('c'); // End the game if computer wins
            return; // Exit to prevent further code execution
        }

        if (!hitShip) { // If missed, end turn
            clearInterval(computerLoop);
            gameState.turn = 'r';
            onComplete(); // Call the callback to update gameStep
        }
    }, 1000);
}

function end(team) {
    const endModal = document.querySelector("#end-modal");
    const winnerText = document.querySelector("#winner-text");
    winnerText.textContent = team === 'r' ? 'You won!' : 'You lost.';
    endModal.prepend(winnerText);

    endModal.showModal();
}

function restart() {
    player = new Player('r');
    computer = new Player('c');
    drawBoard(player);
    drawBoard(computer);
    gameStep.textContent = "your turn.";
    const endModal = document.querySelector("#end-modal");
    endModal.close();
}

let player = new Player('r');
let computer = new Player('c');

const gameStep = document.querySelector("#game-step");
gameStep.textContent = "your turn.";

const replayButton = document.querySelector("#end-modal > button");
replayButton.addEventListener("click", restart);

drawBoard(player);
drawBoard(computer);

export { computerTurn, end };
