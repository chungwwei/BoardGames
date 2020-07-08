import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { Game2048 } from '../Games/Game2048';

class Game2048Component extends Component {

  constructor(props) {
    super(props)
    let arr = []
    this.state = {
      vals: arr,
      moves: 0,
      time: 0,
      game: new Game2048()
    }

    let cellVals = this.state.game.board.cellVals
    let cells = this.state.game.board.getAllCells()
    for (let i=0; i<cells.length; i ++) {
      if (cellVals[cells[i]] == null)
        arr.push(" ")
      else
        arr.push(cellVals[cells[i]])
    }
  }

  reset() {
    let newGame = new Game2048()
    this.updateBoardVals(newGame.board)
    this.setState({
      game: newGame,
      vals: this.state.vals
    })

  }

  updateBoardVals(board) {
    let cellVals = board.cellVals
    let cells = board.getAllCells()
    for (let i=0; i<cells.length; i ++) {
      if (cellVals[cells[i]] == null)
        this.state.vals[i] = " "
      else
        this.state.vals[i] = cellVals[cells[i]]
    }
  }

  refreshBoard() {
    this.updateBoardVals(this.state.game.board)
    this.setState({
      vals: this.state.vals
    })
  }

  move(direction) {
    this.state.game.processMove(direction)  
    this.refreshBoard()
  }

  render () {

    return(
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className="container">
        <h1>Game2048</h1>
        <div className="board center">
          {
            this.state.vals.map(item => (
              <div className="cell">
                <text>{item}</text>
              </div>
            ))
          }
        </div>
      </div>

      <button onClick={() => this.move('LEFT') } > left </button>
      <button onClick={() => this.move('RIGHT') } > right </button>
      <button onClick={() => this.move('UP') } > up </button>
      <button onClick={() => this.move('DOWN') } > down </button>

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

export default Game2048Component;