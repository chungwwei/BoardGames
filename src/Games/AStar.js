import { GameBoard, RectangleGameBoard, Cell} from "../board/board"

export class AStar {

    constructor () {
        /* set up the board, each cell is a node */
        this.board = new RectangleGameBoard(13, 13)
        console.log('AStar init')
        this.cellVals = this.board.cellVals
        let cells = this.board.getAllCells()
        let row   = 13
        let col   = 13
        console.log(cells)
        /**
         *  set up edges for each node
         *  for a node u, add an undirected edge (u, v)
         *  where v is a neighbor of u
         * 
         *  representation: adjacent list
         *  key: cell
         *  val: [cell_0, cell_1]
         */
        let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
        this.adj = {}
        for (let k = 0; k < cells.length; k ++) {

            let cell = cells[k]
            let i    = cell.getX()
            let j    = cell.getY()
            this.adj[cell] = []
            
            if (i === 0 && j === 0) {
                this.adj[cell].push(this.board.getCell(i, j + 1))
                this.adj[cell].push(this.board.getCell(i + 1, j))
            } else if (i === 0 && j === col - 1) {
                this.adj[cell].push(this.board.getCell(i, j - 1))
                this.adj[cell].push(this.board.getCell(i + 1, j))
            } else if (i === row - 1 && j === 0) {
                this.adj[cell].push(this.board.getCell(i - 1, j))
                this.adj[cell].push(this.board.getCell(i, j + 1))
            } else if (i == row - 1 && j === col - 1) {
                this.adj[cell].push(this.board.getCell(i - 1, j))
                this.adj[cell].push(this.board.getCell(i, j - 1))

            } else if (i === 0 && j > 0 && j < col - 1) {
                this.adj[cell].push(this.board.getCell(i, j + 1))
                this.adj[cell].push(this.board.getCell(i, j - 1))
                this.adj[cell].push(this.board.getCell(i + 1, j))
            } else if (i === row - 1 && j > 0 && j < col - 1) {
                this.adj[cell].push(this.board.getCell(i, j + 1))
                this.adj[cell].push(this.board.getCell(i, j - 1))
                this.adj[cell].push(this.board.getCell(i - 1, j))
            } else if (j === 0 && i > 0 && i < row - 1) {
                this.adj[cell].push(this.board.getCell(i + 1, j))
                this.adj[cell].push(this.board.getCell(i - 1, j))
                this.adj[cell].push(this.board.getCell(i, j + 1))
            } else if (j === col - 1 && i > 0 && i < row - 1) {
                this.adj[cell].push(this.board.getCell(i + 1, j))
                this.adj[cell].push(this.board.getCell(i - 1, j))
                this.adj[cell].push(this.board.getCell(i, j - 1))
            } else {
                for (let n=0; n<dirs.length; n ++) {
                    let dir = dirs[n]
                    let dx = dir[0]
                    let dy = dir[1]
                    let insert = this.board.getCell(i + dx, j + dy)
                    this.adj[cell].push(insert)
                }
            }
        }
        console.log(this.adj)
    }

    setStart(cell) {}
    setEnd(cell) {}
    execute() {
        let start = this.board.getCell(1, 1)
        let end   = this.board.getCell(5, 5)
        
        let visited = {}
        for (let i=0; i<13; i++) {
            for (let j=0; j<13; j++) {
                let cell = this.board.getCell(i, j)
                visited[cell] = false
            }
        }
        this.bfs(start, end, visited)
    }

    bfs(start, end, visited) {
        let q = []
        visited[start] = true
        q.push(start)
        let flag = false
        while (q.length !== 0) {
            let cell = q.shift()
            let adj  = this.adj[cell]

            for (let i=0; i<adj.length; i++) {
                let cur = adj[i]
                if (cur.i === end.i && cur.j === end.j) {
                    flag = true
                    break
                }
                if (!visited[adj[i]]) {
                    visited[adj[i]] = true
                    adj[i].visited = true
                    q.push(adj[i])
                }
                if (flag) break
            }
        }
    }

    findEmptyCell() {
        let cells = this.board.getAllCells()
        let cellsVal = this.board.cellVals
    }
}