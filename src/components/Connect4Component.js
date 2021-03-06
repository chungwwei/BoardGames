import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { Connect4 } from '../Games/Connect4';

class Connect4Component extends Component {

  constructor(props) {
    super(props)
    let arr = []

    // vals holds the list of cells
    this.state = {
      vals: arr,
      moves: 0,
      time: 0,
      refresh: false,
      game: new Connect4()
    }

    let cellVals = this.state.game.board.cellVals
    let cells = this.state.game.board.getAllCells()
    for (let i=0; i<cells.length; i ++) {
        arr.push(cells[i])
    }
  }

  reset() {
    let newGame = new Connect4()
    this.updateBoardVals(newGame.board)
    this.setState({
      game: newGame,
      vals: this.state.vals
    })

  }

//   updateBoardVals(board) {
//     let cellVals = board.cellVals
//     let cells = board.getAllCells()
//     for (let i=0; i<cells.length; i ++) {
//       if (cellVals[cells[i]] == null)
//         this.state.vals[i] = " "
//       else
//         this.state.vals[i] = cellVals[cells[i]]
//     }
//   }




  refreshBoard() {
    this.setState({
      refresh: !this.state.refresh,
    })
  }

  move(col) {
    console.log("move")
    console.log(col)
    // col is the cell
    this.state.game.processMove(col)
    this.state.game.processAI()
    // this.state.game.processMove(direction)  
    this.refreshBoard()
  }

  render () {

    return(
    <div>
      <div className="container">
        <h1>Connect4</h1>
        <div className="connect_four_board center">
          {
            this.state.vals.map(item => (
              <div className="cell" onClick={() => this.move(item) }>
                <text>{this.state.game.cellVals[item]}</text>
              </div>
            ))
          }
        </div>
      </div>

      <Button variant="contained" color="primary">
        Start
      </Button>

      <Button onClick={() => this.reset() } variant="contained" color="primary">
        Reset
      </Button>

    </div>
  );
  }
}

export default Connect4Component;