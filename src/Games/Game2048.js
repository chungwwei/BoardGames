import { GameBoard } from "../board/board"

export class Game2048 {

    constructor () {
        this.board = new GameBoard(4)
        this.board.initialize2048()
    }

    canMove() { 
        var cellVals = this.board.cellVals
        for (let k in cellVals) {
            if (cellVals[k] === null)
                return true
        }
        return false
    }

    hasWon() {
        var cellVals = this.board.cellVals
        for (let k in cellVals) {
            if (cellVals[k] === 2048)
                return true
        }
        return false
    }

    processMove(direction) {
        if (this.moveValues(direction)) {
            this.addNewValue()
        }
    }

    get(cell) {
        let cellVals = this.board.cellVals
        return cellVals[cell]
    }

    set(cell, val) {
        let cellVals = this.board.cellVals
        return cellVals[cell] = val
    }


    addNewValue() {
        let cells = this.board.getAllCells()
        let emptyCells = cells.filter(cell => this.get(cell) === null)

        // No empty cells
        if (emptyCells.length === 0) return null

        // Create randomVal and place it at null index
        emptyCells = this.board.shuffle(emptyCells)
        let randomCell = emptyCells[0]
        this.set(randomCell, 2)        

    }

    moveValuesInRowOrColumn(list, direction) {
        let cellVals = this.board.cellVals
        let mergeList = this.moveAndMergeEqual(list)
        let nonEmptySize = mergeList.length
        var i = 0
        if (direction === 'DOWN' | direction === 'RIGHT') {
            for (i=3; i>=0; i --) {
                if (mergeList.length > 0) {
                    cellVals[list[i]] = mergeList.pop()
                } else {
                    cellVals[list[i]] = null
                }
            }
        } else {   
            for (i=0; i<list.length;i ++) {
                if (i < mergeList.length) {
                    cellVals[list[i]] = mergeList[i]
                } else {
                    cellVals[list[i]] = null
                }
            }
        }

        return nonEmptySize > 0 && nonEmptySize < list.length
    }

    moveValues(direction) {
        let range = 4
        let isMoved = false
        if (direction === 'LEFT' || direction === 'RIGHT') {
            for (let i=0; i<range; i ++) {
                let row = this.board.getRow(i, false)
                let moved = this.moveValuesInRowOrColumn(row, direction)
                isMoved = isMoved || moved
            }
        }

        if (direction === 'UP' || direction === 'DOWN') {
            for (let i=0; i<range; i ++) {
                let column = this.board.getColumn(i, false)
                let moved = this.moveValuesInRowOrColumn(column, direction)
                isMoved = isMoved || moved
            }
        }
        return isMoved
    }


    moveAndMergeEqual(list) {
        let nonEmpty = []
        let cellVals = this.board.cellVals
        for (let i=0; i<list.length; i ++) {
            if (cellVals[list[i]] !== null)
                nonEmpty.push(cellVals[list[i]])
        }

        let res = []
        
        for (let i=0; i<nonEmpty.length; i ++) {
            if (nonEmpty[i] === res[res.length - 1]) {
                res[res.length - 1] = res[res.length - 1] * 2
            } else {
                res.push(nonEmpty[i])
            }
        }
        
        // let res = []
        // for (let i=0; i<4; i ++) {
        //     if (nonEmpty[i] !== 0) {
        //         res.push(nonEmpty[i])
        //     }
        // }
        console.log(res)
        return res
    }
}
