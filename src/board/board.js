export class SquareBoard {

    constructor(width) {
        this.width = width
        this.board = []

        // board
        for (let i=0; i<width; i ++) {
            var arr = []
            for (let j=0; j<width; j++) {
                arr.push(new Cell(i, j))
            }
            this.board.push(arr)
        }        
    }

    getCellOrNull(i, j) {
        console.log(`${i}, ${j}`)
        if (i > this.width - 1) return null
        if (j > this.width - 1) return null
        if (i < 0) return null
        if (j < 0) return null
        return this.getCell(i, j)
    }

    getCell(i, j) {
        return this.board[i][j]
    }

    getAllCells() {
        var arr = []
        for (let i=0; i<this.width; i ++) {
            for (let j=0; j<this.width; j ++) {
                arr.push(this.board[i][j])
            }
        }
        return arr
    }

    getRow(i, wantReverse) {
        let arr = []
        let row = this.board[i]
        for (let k=0; k<4; k ++) {
            arr.push(this.board[i][k])
        }

        if (wantReverse) return arr.reverse()
        return arr
    }

    getColumn(j, wantReverse) {
        let arr = []
        let cells = this.getAllCells()
        for (let k=0; k<cells.length; k ++) {
            let cell = cells[k]
            if (cell.j === j)
                arr.push(cell)
        }
        if (wantReverse) return arr.reverse()
        return arr
    }

    getNeighbour(direction, i, j) {
        if (direction === 'UP') return this.getCellOrNull(i - 1, j)
        if (direction === 'LEFT') return this.getCellOrNull(i , j - 1)
        if (direction === 'DOWN') return this.getCellOrNull(i + 1, j)
        if (direction === 'RIGHT') return this.getCellOrNull(i, j + 1)
    }
}

export class GameBoard extends SquareBoard {

    constructor(width) {
        super()
        this.width = width
        // board
        for (let i=0; i<width; i ++) {
            var arr = []
            for (let j=0; j<width; j++) {
                arr.push(new Cell(i, j))
            }
            this.board.push(arr)
        } 

        this.cellVals = {}
        for (let i=0; i<width; i ++) {
            for (let j=0; j<width; j++) {
                let cell = this.board[i][j]
                this.cellVals[cell] = null
            }
        } 
    }

    get(cell) {
        return this.cellVals[cell]
    }

    set(cell, val) {
        this.cellVals[cell] = val
    }

    initialize2048() {
        let k = 2
        let cells = this.getAllCells()
        let first_cell = cells[0]
        let second_cell = cells[1]

        this.cellVals[first_cell] = 2
        this.cellVals[second_cell] = 2

        console.log(first_cell)
        console.log(second_cell)
    
    }

    initialize15() {
        let arr = []
        for (let i=1; i<=15; i ++) {
            arr.push(i)
        }
        arr = this.shuffle(arr)

        let cellVals = this.cellVals
        let cells = this.getAllCells()
        for (let i=0; i<cells.length; i ++) {
            let cell = cells[i]
            if (i === 15) {
                cellVals[cell] = null
                break;
            }
            cellVals[cell] = arr[i]
        }
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}


export class RectangleBoard {

    constructor(width, height) {
        this.width = width
        this.height= height
        this.board = []

        // board
        for (let i=0; i<width; i ++) {
            var arr = []
            for (let j=0; j<height; j++) {
                arr.push(new Cell(i, j))
            }
            this.board.push(arr)
        }        
    }

    getCellOrNull(i, j) {
        if (i > this.height - 1) return null
        if (j > this.width - 1) return null
        if (i < 0) return null
        if (j < 0) return null
        return this.getCell(i, j)
    }

    getCell(i, j) {
        return this.board[i][j]
    }

    getAllCells() {
        var arr = []
        for (let i=0; i<this.width; i ++) {
            for (let j=0; j<this.height; j ++) {
                arr.push(this.board[i][j])
            }
        }
        return arr
    }

    getRow(i, wantReverse) {
        let arr = []
        let row = this.board[i]
        for (let k=0; k<4; k ++) {
            arr.push(this.board[i][k])
        }

        if (wantReverse) return arr.reverse()
        return arr
    }

    getColumn(j, wantReverse) {
        let arr = []
        let cells = this.getAllCells()
        for (let k=0; k<cells.length; k ++) {
            let cell = cells[k]
            if (cell.j === j)
                arr.push(cell)
        }
        if (wantReverse) return arr.reverse()
        return arr
    }

    getNeighbour(direction, i, j) {
        if (direction === 'UP') return this.getCellOrNull(i - 1, j)
        if (direction === 'LEFT') return this.getCellOrNull(i , j - 1)
        if (direction === 'DOWN') return this.getCellOrNull(i + 1, j)
        if (direction === 'RIGHT') return this.getCellOrNull(i, j + 1)
    }
}

export class RectangleGameBoard extends RectangleBoard {

    constructor(width, height) {
        super(width, height)

        this.cellVals = {}
        for (let i=0; i<width; i ++) {
            for (let j=0; j<height; j++) {
                let cell = this.board[i][j]
                this.cellVals[cell] = null
            }
        } 
    }

    get(cell) {
        return this.cellVals[cell]
    }

    set(cell, val) {
        this.cellVals[cell] = val
    }
}

export class Cell {

    constructor(i, j) {
        this.i = i
        this.j = j
        this.visited = false
    }

    getX() {
        return this.i
    }

    getY() {
        return this.j
    }
    
    getVisited() {
        return this.visited
    }

    toString() {
        return `cell(${this.i}, ${this.j})`
    }

}