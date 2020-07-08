import { GameBoard, RectangleGameBoard } from "../board/board"

export class Connect4 {

    constructor () {
        this.board = new RectangleGameBoard(6, 7)
        this.cellVals = this.board.cellVals
        let cells = this.board.getAllCells()
        console.log("cells are : " + cells)
    }

    canMove() { 
    }

    hasWon() {
        let won = true
        let cells = this.board.getAllCells()
        let cellVals = this.board.cellVals

    }

    processMove(cell) {
        let j = cell.j
        let col = this.board.getColumn(j, true)
        
        if (this.cellVals[col[col.length - 1]] !== null)
            return

        // find first empty cell and assigned it as taken
        for (let i=0; i<col.length; i ++) {
            if (this.cellVals[col[i]] === null) {
                this.cellVals[col[i]] = 1
                break;
            }
        }
    }

    get() {

    }

    findEmptyCell() {
        let cells = this.board.getAllCells()
        let cellsVal = this.board.cellVals
    }
}