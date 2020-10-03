import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { Game15 } from '../Games/Game15'
import { Card, CardContent, Typography } from '@material-ui/core';
import TimerComponent from './TimerComponent';

class Game15Component extends Component {

  constructor(props) {
    super(props)
    console.log(this.game)

    let arr = []
    this.state = {
      vals: arr,
      moves: 0,
      time: 0,
      game: new Game15(4),
      moves: 0,
      gameStart: false,
      seconds: 0,
    }

    let cellVals = this.state.game.board.cellVals
    let cells = this.state.game.board.getAllCells()
    for (let i=0; i<cells.length; i ++) {
      if (cellVals[cells[i]] == null)
        arr.push(" ")
      else
        arr.push(cellVals[cells[i]])
    }
    this.handleKeys = this.handleKeys.bind(this)
  }

  handleKeys(event) {
    let code = event.keyCode
    // LEFT, UP, RIGHT, DOWN
    console.log(code)
    if(code === 37) {
      this.move("LEFT")
    } else if (code === 38) {
      this.move("UP")
    } else if (code === 39) {
      this.move("RIGHT")
    } else if (code === 40) {
      this.move("DOWN")
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeys, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  reset() {
    let newGame = new Game15(4)
    this.updateBoardVals(newGame.board)
    this.setState({
      game: newGame,
      vals: this.state.vals,
      moves: 0,
      gameStart: false,
      seconds: 0
    })
    clearInterval(this.timer)
  }

  startGame() {
    if (this.state.gameStart === true)
      return
    this.setState({
      gameStart: true,
      seconds: 0
    })
    this.timer = setInterval(
      () => this.setState({
        seconds: this.state.seconds + 1
      }), 10)
    
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
      vals: this.state.vals,
      moves: this.state.moves + 1
    })
  }

  move(direction) {
    let moved = this.state.game.processMove(direction)  
    if (moved === false) return
    this.refreshBoard()
  }

  render () {
    let vals = this.state.vals
    let seg_1= vals.slice(0, 4)
    let seg_2= vals.slice(4, 8)
    let seg_3= vals.slice(8, 12)
    let seg_4= vals.slice(12, 16)

    return(
      <div>
        {/* hud */}
        <div className="game_fifteen_hud center">
          <Card className="game_fifteen_card">
            <CardContent className="game_fifteen_cardcontent">
              <Typography color="textSecondary">
                Moves
              </Typography>
              <Typography color="textSecondary">
                {this.state.moves}
              </Typography>
            </CardContent>
          </Card>

          <Card className="game_fifteen_card">
            <CardContent className="game_fifteen_cardcontent">
              <TimerComponent seconds={this.state.seconds} />
              {/* <Typography color="textSecondary">
                Time
              </Typography>
              <Typography color="textSecondary">
                03:12
              </Typography> */}
            </CardContent>
          </Card>
          <h1>Game of 15</h1>
        </div>

        {/* Game itself - The board*/}
        <div className="twoofoureight_game_container center">
          <div className="grid_container">
            <div className="grid_row">
              {seg_1.map(item => (
                <div className={item !== " " ? "grid_cell" : "grid_cell_empty"}>
                  <text>{item}</text>
                </div>
              ))}

            </div>

            <div className="grid_row">
            {seg_2.map(item => (
                <div className={item !== " " ? "grid_cell" : "grid_cell_empty"}>
                  <text>{item}</text>
                </div>
              ))}
            </div>

            <div className="grid_row">
              {seg_3.map(item => (
                <div className={item !== " " ? "grid_cell" : "grid_cell_empty"}>
                  <text>{item}</text>
                </div>
              ))}
            </div>

            <div className="grid_row">
              {seg_4.map(item => (
                <div className={item !== " " ? "grid_cell" : "grid_cell_empty"}>
                  <text>{item}</text>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* buttons group */}
        <div className="game_fifteen_buttons">
          <Button className="game_fifteen_button" onClick={() => this.startGame() } variant="contained" color="primary">
            Start
          </Button>
          <Button className="game_fifteen_button" onClick={() => this.reset() } variant="contained" color="primary">
            Reset
          </Button>
        </div>
 
      </div>
    );
  }
}

export default Game15Component;