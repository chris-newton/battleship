import { Player } from "./player.js";
import { drawBoard } from "./viewController.js";
import { gameState } from "./globals.js";

import './style.css';

function computerTurn() {
    let randRow = Math.floor(Math.random() * 10);
    let randCol = Math.floor(Math.random() * 10);

    while (player.gameboard.receiveAttack(randRow, randCol)) {
        drawBoard(player);
        do {
            randRow = Math.floor(Math.random() * 10);
            randCol = Math.floor(Math.random() * 10);
        } while (player.gameboard.board[randRow][randCol] !== '');
        if (player.gameboard.allShipsSunk()) {
            end();
        }
    }
    drawBoard(player);
    gameState.turn = 'r';
}

function end() {
    const body = document.querySelector("body");
    const endModal = document.createElement("div");
    endModal.classList.add('end')

}

const player = new Player('r');
const computer = new Player('c');
const playerBoard = player.gameboard;
const computerBoard = computer.gameboard;

drawBoard(player);
drawBoard(computer);

export { computerTurn, end };
