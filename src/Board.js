import React, { Component } from 'react'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardType: '4x4',
    }

    this.handleBoardTypeChange = this.handleBoardTypeChange.bind(this)
  }

  handleBoardTypeChange = event => {
    this.setState({ boardType: event.target.value })
  }

  render() {
    return (
      <div className="Board">
        <select value={this.state.boardType} onChange={this.handleBoardTypeChange}>
          <option value="4x4">4x4</option>
          <option value="5x5">5x5</option>
          <option value="6x6">6x6</option>
        </select>

        render textboxes based on board state
      </div>
    )
  }
}

export default Board
