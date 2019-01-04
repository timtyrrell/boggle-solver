import React, { Component } from 'react'
import wordList from './words_alpha.txt'
import Graph from './lib/Graph'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  wrapper: {
    marginTop: '20px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit}px * 2`,
  },
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  select: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardType: '4',
      boggleInputValues: {},
      wordMatches: [],
    }
  }

  handleBoardSolve = event => {
    const { boardType, boggleInputValues } = this.state
    const formattedLetters = []

    for (let x = 0; x < Number(boardType); x++) {
      formattedLetters.push([])
    }

    Object.keys(boggleInputValues).forEach((key) => {
      const row = key.slice(0,1)
      const column = key.slice(1,2)
      formattedLetters[row][column] = boggleInputValues[key]
    })

    const trimmedDictionary = this.loadDictionary()

    //format (for 4x4)
    // [
    //   ['a','p','p','x'],
    //   ['x','x','l','x'],
    //   ['n','x','e','x'],
    //   ['x','x','x','Z']
    // ]
    const graph = new Graph(boardType, formattedLetters, trimmedDictionary)
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

  loadDictionary = () => {
    const { boggleInputValues } = this.state
    const rawWords = wordList.split('\n')

    // not sure why carraige returns, but no time to investigate now
    const words = rawWords.map((word) => word.replace('\r', ''))

    // get array of input letters
    const boggleLetters = Object.values(boggleInputValues)

    // only add words that consist of actual submitted letters
    const dictionary = words.filter((word) => {
      return word.split('').every((char) => boggleLetters.indexOf(char) >= 0) && word.length > 2
    })

    // console.log('word length', words.length)
    // console.log('dict length', dictionary.length)
    // console.log('dictionary', dictionary)
    return dictionary
  }

  renderTextBoxes = () => {
    const { classes } = this.props
    const textBoxes = []

    for (let row = 0; row < this.state.boardType; row++) {
      for (let column = 0; column < this.state.boardType; column++) {
        textBoxes.push(
          <Grid item xs={3} key={`${row}${column}`}>
            <TextField
              autoComplete="off"
              id={`${row}${column}`}
              key={`${row}${column}`}
              maxLength="1"
              name={`${row}${column}`}
              onChange={this.handleInputChange}
              className={classes.textField}
              margin="normal"
              variant="filled"
              value={this.state.boggleInputValues[`${row}${column}`]}
            />
          </Grid>
        )
      }
    }
    return textBoxes
  }

  renderWordMatches = () => {
    const { wordMatches } = this.state
    const { classes } = this.props

    // console.log('wordMatches', wordMatches.length)
    if (!wordMatches.length) return null
    return wordMatches.map((word) => <Paper className={classes.paper} key={word}>{word}</Paper>)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <Typography variant="subtitle1" gutterBottom>
          Boggle Solver:
          <Select
            className={classes.textField}
            value={this.state.boardType}
            onChange={this.handleBoardTypeChange}
            input={
              <OutlinedInput
                labelWidth={0}
                name="boardType"
                id="boardType"
              />
            }
          >
            <MenuItem value={4}>4x4</MenuItem>
            <MenuItem value={5}>5x5</MenuItem>
            <MenuItem value={6}>6x6</MenuItem>
          </Select>
          <Button onClick={this.handleBoardSolve} variant="contained" color="primary">
            Solve
          </Button>
        </Typography>
        <Grid container spacing={24}>
          { this.renderTextBoxes()}
          { this.renderWordMatches() }
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Board)
