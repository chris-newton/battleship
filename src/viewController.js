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

    if (!didHit) {
        gameState.turn = (gameState.turn === 'r') ? 'c' : 'r'; 
        computerTurn();
        return;
    }   

    if (player.gameboard.allShipsSunk()) {
        end();
    }
}

export { drawBoard };