import React, { Component } from 'react'
import wordList from './words_alpha.txt'
import Graph from './lib/Graph'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardType: '4',
      boggleInputValues: {},
      dictionary: [],
      wordMatches: [],
    }
  }

  componentDidMount() {
    const words = wordList.split('\n')
    const dictionary = words.map((word) => word.replace('\r', ''))
    this.setState({ dictionary })
  }

  handleBoardSolve = event => {
    const { boardType, boggleInputValues, dictionary } = this.state
    const formattedLetters = []

    for (let x = 0; x < Number(boardType); x++) {
      formattedLetters.push([])
    }

    Object.keys(boggleInputValues).forEach((key) => {
      const row = key.slice(0,1)
      const column = key.slice(1,2)
      formattedLetters[row][column] = boggleInputValues[key]
    })

    //format (for 4x4)
    // [
    //   ['a','p','p','x'],
    //   ['x','x','l','x'],
    //   ['n','x','e','x'],
    //   ['x','x','x','Z']
    // ]
    const graph = new Graph(boardType, formattedLetters, dictionary)
    graph.findWordMatches()
    this.setState({ wordMatches: graph.matchedWords })
  }

  handleBoardTypeChange = event => {
    this.setState({ boardType: event.target.value })
  }

  handleInputChange = event => {
    const { target } = event
    const { name, value } = target

    this.setState(prevState => ({
      boggleInputValues: {
        ...prevState.boggleInputValues,
        [name]: value,
      },
    }))
  }

  renderTextBoxes = () => {
    const textBoxes = []
    for (let row = 0; row < this.state.boardType; row++) {
      for (let column = 0; column < this.state.boardType; column++) {
        textBoxes.push(
          <input
            autoComplete="off"
            id={`${row}${column}`}
            key={`${row}${column}`}
            maxLength="1"
            name={`${row}${column}`}
            onChange={this.handleInputChange}
            size="1"
            type="text"
            value={this.state.boggleInputValues[`${row}${column}`]}
          />
        )
      }
    }
    return textBoxes
  }

  renderWordMatches = () => {
    const { wordMatches } = this.state
    if (!wordMatches.length) return null
    return wordMatches.map((word) => <span key={word}>{word}</span>)
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
        { this.renderWordMatches() }
        <button onClick={this.handleBoardSolve}>Solve</button>
      </div>
    )
  }
}

export default Board
