import { Ship } from "./ship.js";
import { boardRows, boardCols } from "./globals.js";

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
        this.ships = [5, 4, 3, 3, 2].map(x => new Ship(x));
        this.randomizeBoard();
        console.log(this.board);
    }

    // randomly places all ships
    randomizeBoard() {
        this.ships.forEach(ship => {
            let randOrientation;
            let randRow;
            let randCol;

            do {
                randRow = Math.floor(Math.random() * 10);
                randCol = Math.floor(Math.random() * 10);
                randOrientation = Math.floor(Math.random() * 2) === 0 ? 'v' : 'h';
            } while (!this.validatePlacement(ship, randRow, randCol, randOrientation));
            
            this.placeShip(ship, randRow, randCol, randOrientation);
        })
    }

    // looks through all the cells the ship would take up with this placement
    // returns true iff the placement won't overlap or violate spacing, else false
    validatePlacement(ship, row, col, orientation) {
        if (orientation === 'v') {
            for (let i = row; i < row + ship.length; i++) {
                if (i === boardRows || this.board[i][col] !== '' || !this.checkNeighbors(i, col)) {
                    return false;
                }
            }
        } else {
            for (let i = col; i < col + ship.length; i++) {
                if (i === boardCols || this.board[row][i] !== '' || !this.checkNeighbors(row, i)) {
                    return false;
                }
            }
        }
        return true;
    }

    // returns true iff the cell at [row, col] is not adjacent to any ships
    checkNeighbors(row, col) {
        if (col > 0 && this.board[row][col-1] !== '') return false;                           // left
        
        if (col < boardCols - 1 &&  this.board[row][col+1] !== '') return false               // right
        
        if (row > 0 && this.board[row-1][col] !== '') return false;                           // above
        
        if (row < boardRows-1 && this.board[row+1][col] !== '') return false;                 // below
        
        if (col > 0 && row > 0 && this.board[row-1][col-1] !== '') return false;              // left-above
        
        if (col > 0 && row < boardRows-1 && this.board[row+1][col-1] !== '') return false     // left-below
        
        if (col < boardCols-1 && row > 0 && this.board[row-1][col+1] !== '') return false;    // right-above
        
        if (col < boardCols-1 && row < boardRows-1 && this.board[row+1][col+1] !== '') return false; // right-below
        
        return true;
    }

    placeShip(ship, row, col, orientation) {
        // remove the ship from board
        if (ship.row) {
            if (orientation === 'v') {
                for (let i = ship.row; i < ship.row + ship.length; i++) {
                    this.board[i][ship.col] = '';
                }
            } else if (orientation === 'h') {
                for (let i = ship.col; i < ship.col + ship.length; i++) {
                    this.board[ship.row][i] = '';
                }
            }
        }
        
        // update ship position
        ship.setPosition(row, col, orientation);

        // place ship on the board 
        if (orientation === 'v') {
            for (let i = row; i < row + ship.length; i++) {
                this.board[i][col] = 's';
            }
        } else if (orientation === 'h') {
            for (let i = col; i < col + ship.length; i++) {
                this.board[row][i] = 's';
            }
        }
    }

    receiveAttack(row, col) {
        const hitShip = this.shipAt(row, col);
        if (hitShip) {
            hitShip.hit();
            this.board[row][col] = 'x'; // successful hit

            // if ship sunk, mark its cells 'sunk'
            if (hitShip.isSunk()) {
                if (hitShip.orientation === 'v') {
                    for (let i = hitShip.row; i < hitShip.row + hitShip.length; i++) {
                        this.board[i][hitShip.col] = "sunk";
                    }
                } else { 
                    for (let i = hitShip.col; i < hitShip.col + hitShip.length; i++) {
                        this.board[hitShip.row][i] = "sunk";
                    }
                }
            }
            return 1; // return 1 to continue player's turn
        } else {
            this.board[row][col] = 'm'; // miss
            return 0; // end player's turn
        }
    }
    
    allShipsSunk() {
        return this.ships.reduce((prev, curr) => curr.isSunk() && prev, true);
    }

    // returns the ship at row, col or null if no ship
    shipAt(row, col) {
        const foundShip = this.ships.find((ship) => {
            if (ship.orientation === 'v' && col === ship.col) {
                if (row >= ship.row && row < ship.row + ship.length) {
                    return ship;
                }
            } else if (ship.orientation === 'h' && row === ship.row) {
                if (col >= ship.col && col < ship.col + ship.length) {
                    return ship;
                }
            }
        });
        return foundShip ? foundShip : null;
    }
}

export { Gameboard };