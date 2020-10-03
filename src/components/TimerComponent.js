import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
class TimerComponent extends Component {

    constructor(props) {
        super(props);
    }

    formatTime(seconds) {
        if (seconds === 0) return '00:00'
        let min = Math.floor(seconds / 60)
        let sec = seconds % 60
        return `${min}:${sec}`
            
    }

  render() {
      
      return (
        <div>
            <Typography color="textSecondary">
                Time
            </Typography>
            <Typography color="textSecondary">
                { this.formatTime(this.props.seconds) }
            </Typography>
        </div>
      )
  }
}

export default TimerComponent;