import { boardRows, boardCols, gameState } from './globals.js';
import { computerTurn, end } from './index.js';

function drawBoard(player) {
    const grid = document.querySelector(`#${player.team}-board-grid`);
    grid.replaceChildren(); // wipe

    for (let row = 0; row < boardRows; row++) {
        for (let col = 0; col < boardCols; col++) {
            const cell = document.createElement("div");
            cell.id = `cell${row}${col}${player.team}`;
            cell.className = 'cell';

            if (player.team === 'r' && player.gameboard.board[row][col] === 's') {
                cell.classList.add('cell-ship');
            } else if (player.gameboard.board[row][col] === 'x') {
                cell.classList.add('cell-hit');
                cell.textContent = '•';
            } else if (player.gameboard.board[row][col] === 'm') {
                cell.classList.add('cell-miss');
                cell.textContent = '•';
            } else if (player.gameboard.board[row][col] === 'sunk') {
                cell.classList.remove('cell-hit');
                cell.classList.add('cell-sunk')
                cell.textContent = '✕';
            }

            // make the cells of the computer's board clickable
            if (player.team === 'c') {
                cell.addEventListener("click", () => {
                    if (gameState.turn === 'r') {
                        handleAttack(player, row, col);
                    }
                });
            }
            grid.appendChild(cell); 
        }
    }
}


function handleAttack(player, row, col) {
    const didHit = player.gameboard.receiveAttack(row, col);
    drawBoard(player);

    const gameStep = document.querySelector("#game-step");

    if (!didHit) {
        gameState.turn = (gameState.turn === 'r') ? 'c' : 'r';
        gameStep.textContent = "opponent's turn."; // Indicate it's the opponent's turn

        computerTurn(() => gameStep.textContent = "your turn.");

        return;
    } else {
        gameStep.textContent = "hit! Go again."; 
    }

    // CASE: player wins 
    if (player.gameboard.allShipsSunk()) {
        end('r');
    }
}


export { drawBoard };