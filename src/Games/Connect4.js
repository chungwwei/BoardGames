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

    /*
    function minimax(node, depth, maximizingPlayer) is
        if depth = 0 or node is a terminal node then
            return the heuristic value of node
        if maximizingPlayer then
            value := −∞
            for each child of node do
                value := max(value, minimax(child, depth − 1, FALSE))
            return value
        else (* minimizing player *)
            value := +∞
            for each child of node do
                value := min(value, minimax(child, depth − 1, TRUE))
            return value
    */

    minimax(node, depth, maximizingPlayer) {

        return 1
        if (depth === 0 || node === null)
            return
        
        if (maximizingPlayer) {

        } else {

        }
    }

    processAI() {
        console.log("processing AI")
        let available = this.getAvailableSpots()
        for (let i=0; i<available.length; i ++) {
            // assigns val 
            this.cellVals[available[i]] = 2
            // call minimax
            this.minimax(this.board, true)
        }

        let col = this.board.getColumn(2, true)
        console.log(col)
        if (col.length < 9) {
            for (let i=0; i<col.length; i ++) {
                if (this.cellVals[col[i]] === null) {
                    this.cellVals[col[i]] = 1
                    break;
                }
            }
        }
    }

    getAvailableSpots() {
        let available = []
        for (let i = 0; i < 7; i ++) {
            let col = this.board.getColumn(i, true)
            if (this.cellVals[col[col.length - 1]] == null)
                 available.push(col[col.lenght - 1])
        }
        return available
    }

    get() {

    }

    findEmptyCell() {
        let cells = this.board.getAllCells()
        let cellsVal = this.board.cellVals
    }
}