import React, { Component } from 'react';
import './App.css';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core/'
import {Tabs, Tab, TabPanel} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { GameBoard } from "./board/board.js";
import { Game2048 } from './Games/Game2048';
import { Game15 } from './Games/Game15';
import Game2048Component from './components/Game2048Component';
import Connect4Component from './components/Connect4Component';
import { AppBar } from '@material-ui/core';
import Game15Component from './components/Game15Component';
import AStarComponent from './components/AStarComponent';


class App extends Component {

  constructor(props) {
    super(props)
    console.log(this.game)

    let arr = []
    this.state = {
      vals: arr,
      moves: 0,
      time: 0,
      game: new Game15(4),
      tabValue: 0
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
    let newGame = new Game15(4)
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

  handleTabChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    })
  }

  render () {
    let game;
    if (this.state.tabValue === 1)
      game = <Game2048Component/>
    else if (this.state.tabValue === 2)
      game = <Connect4Component/>
    else if (this.state.tabValue === 0)
      game = <Game15Component/>
    else if (this.state.tabValue === 3)
      game = <AStarComponent/>

    return(
    <div className="App">
      {/* App_bar */}
      <div className="app_topbar">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Board Games
            </Typography>

            <Tabs
              value={this.state.tabValue}
              onChange={this.handleTabChange}
              indicatorColor = 'primary'
              textcolor = 'primary'
              centered
            >
              <Tab label='Game of 15' />
              <Tab label='Game of 2048' />
              <Tab label='Connect 4' />
              <Tab label='A*' />
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
      
      {/* App_game */}
      {game}
    </div>
  );
  }
}

export default App;