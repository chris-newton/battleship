import { Ship } from "./ship.js";

class Gameboard {
    constructor() {
        this.board = [['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','','']];
    
        this.ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].map(x => new Ship(x));
    }

    placeShip(ship, team, row, col, orientation) {
        // remove the ship from its current place 
        for (let i = )

        // out of bounds checkign and placing the ship on this.board 
        if (orientation === 'v' && row + ship.length < 10) {
            for (let i = row; i < row + ship.length; i++) {
                this.board[i][col] = team;
            }
        } else if (orientation === 'h' && col + ship.length < 10) {
            for (let i = col; i < col + ship.length; i++) {
                this.board[row][i] = team;
            }
        }
    }

    allShipsSunk() {
        return this.ships.reduce((prev, curr) => curr.isSunk() && prev, true);
    }
}

export { Gameboard };