import React, { Component } from 'react'
import wordList from './words_alpha.txt'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardType: '4',
      dictionary: [],
    }

    this.handleBoardTypeChange = this.handleBoardTypeChange.bind(this)
  }

  componentDidMount() {
    const words = wordList.split("\n")
    this.setState({ dictionary: words })
  }

  handleBoardTypeChange = event => {
    this.setState({ boardType: event.target.value })
  }

  renderTextBoxes() {
    const textBoxes = []
    for (let x = 0; x < this.state.boardType; x++) {
      for (let y = 0; y < this.state.boardType; y++) {
        textBoxes.push(
          <input
            autoComplete="off"
            id={`${x}${y}`}
            key={`${x}${y}`}
            maxLength="1"
            size="1"
            type="text"
          />
        )
      }
    }
    return textBoxes
  }

  render() {
    return (
      <div className="Board">
        <select value={this.state.boardType} onChange={this.handleBoardTypeChange}>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
        </select>

        { this.renderTextBoxes()}
      </div>
    )
  }
}

export default Board
