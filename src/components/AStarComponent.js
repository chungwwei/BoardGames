import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { AStar } from '../Games/AStar';

class AStarComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
        game: new AStar(),
        refresh: false,
    }


  }

  run() {
    console.log('run')
    this.state.game.execute()
    this.setState({
        refresh: !this.state.refresh
    })
  }


  reset() {

  }

  cellClick(item) {
    let cell = item
    this.state.game.setStart(cell)
  }

  getCellColor(item) {
    if (item.visited === false)
        return 'astar__gridcell'
    else 
        return 'astar__gridcell_visited'
  }

  render () {
    let cells = this.state.game.board.getAllCells()
    return(
    <div>
      <div className="astar_container">
        <h1>A Star Demo</h1>
        <div className="astar__background center">
            <div className="astar__gridrow">
                { cells.map(item => (
                    <div className={this.getCellColor(item)}></div>
                ))}
            </div>
        </div>
      </div>

      <Button variant="contained" color="primary">
        Start
      </Button>

      <Button onClick={() => this.reset() } variant="contained" color="primary">
        Reset
      </Button>

      <Button onClick={() => this.run() } variant="contained" color="primary">
        Run
      </Button>
    </div>
  );
  }
}

export default AStarComponent;