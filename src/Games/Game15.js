import { GameBoard } from "../board/board"

export class Game15 {

    constructor () {
        this.board = new GameBoard(4)
        this.board.initialize15()
        let cells = this.board.getAllCells()
        console.log("cells are : " + cells)
    }

    canMove() { 
        return true
    }

    hasWon() {
        let won = true
        let cells = this.board.getAllCells()
        let cellVals = this.board.cellVals
        let k = 1
        for (let i=0; i<cells.length; i ++) {
            if (cellVals[cells[i]] !== k || cellVals[cells[i]] === null)
                won = false
        }
        return won
    }

    processMove(direction) {

        let emptyCell = this.findEmptyCell()
        console.log('emptycell: ' + emptyCell)
        let oppDir = this.oppositeDirection(direction)
        console.log('oppDir' + oppDir)
        let neighborCell = this.board.getNeighbour(oppDir, emptyCell.i, emptyCell.j)
        console.log('cell: ' + neighborCell)
        
        // No cell to move
        if (neighborCell === null) return false

        let cellVals = this.board.cellVals
        cellVals[emptyCell] = cellVals[neighborCell]
        cellVals[neighborCell] = null

    }

    get() {

    }

    oppositeDirection(direction) {
        if (direction === 'UP') return 'DOWN'
        if (direction === 'DOWN') return 'UP'
        if (direction === 'LEFT') return 'RIGHT'
        if (direction === 'RIGHT') return 'LEFT'
    }

    findEmptyCell() {
        let cells = this.board.getAllCells()
        let cellsVal = this.board.cellVals
        for (let i=0; i<cells.length; i ++) {
            if (cellsVal[cells[i]] === null)
                return cells[i]
        }
        // unreachable, there is always a empty cell
        return null
    }





}