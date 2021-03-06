import Node from './Node'

class Graph {
  constructor(boardSize, boggleLetters, dictionary = []) {
    this.boardSize = Number(boardSize)
    this.boggleLetters = boggleLetters
    this.nodes =  this.createNodes(this.boardSize, boggleLetters)
    this.dictionary = dictionary
    this.matchedWords = []
    this.letterLookup = this.generateLetterLookup(dictionary)
  }

  createNodes(boardSize, boggleLetters) {
    const nodes = []

    for (let row = 0; row < boardSize; row++) {
      for (let column = 0; column < boardSize; column++) {
        nodes.push(new Node
          (
            boggleLetters[row][column],
            row,
            column,
            this.generateConnectedNodeList(boggleLetters, row, column, boardSize)
          )
        )
      }
    }
    return nodes
  }

  generateConnectedNodeList(boggleLetters, rowPosition, columnPosition, boardSize) {
    // wow, actually need a semicolon here otherwise JS makes it [][0,1,-1].forEach...
    const connectedNodes = [];

    [0, 1, -1].forEach((rowOffset) => {
      [0, 1, -1].forEach((columnOffset) => {
        const rowOffsetPosition = rowPosition + rowOffset
        const columnOffsetPosition = columnPosition + columnOffset

        if (
          rowOffsetPosition === rowPosition ||
          columnOffsetPosition === columnPosition ||
          rowOffsetPosition === boardSize ||
          columnOffsetPosition === boardSize
        ) {
          return
        }

        if (columnOffsetPosition >= 0 && columnOffsetPosition <= boardSize && boggleLetters[rowPosition][columnOffsetPosition]) {
          if (!connectedNodes.includes(`${rowPosition}${columnOffsetPosition}`)) {
            connectedNodes.push(`${rowPosition}${columnOffsetPosition}`)
          }
        }

        if (rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnPosition]) {
          if (!connectedNodes.includes(`${rowOffsetPosition}${columnPosition}`)) {
            connectedNodes.push(`${rowOffsetPosition}${columnPosition}`)
          }
        }

        if(columnOffsetPosition >= 0 && columnOffsetPosition <= boardSize && rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnOffsetPosition]) {
          if (!connectedNodes.includes(`${rowOffsetPosition}${columnOffsetPosition}`)) {
            connectedNodes.push(`${rowOffsetPosition}${columnOffsetPosition}`)
          }
        }
      })
    })
    return connectedNodes.sort()
  }

  generateLetterLookup(dictionary) {
    return dictionary.reduce((acc, word) => {
      for (let l = 0; l < word.length -1; l++) {
        const short = word.slice(0, l+1)
        acc[short] = word
      }
      return acc
    }, {})
  }

  findWordMatches() {
    // use each node as a root then check for words
    this.nodes.forEach((node) => {
      this.graphSearch('', `${node.rowPosition}${node.columnPosition}`)
    })
  }

  graphSearch(pathLetters = '', nodePosition = '00', visited = []) {
    if (visited.includes(nodePosition)) return
    visited.push(nodePosition)

    const row = Number(nodePosition[0])
    const column = Number(nodePosition[1])
    const node = this.nodes.find((node) => node.rowPosition === row && node.columnPosition === column)
    pathLetters += node.value

    // need length logic for 5x5 and 6x6
    if (pathLetters.length > 2) {
      if(this.letterLookup[pathLetters]) {
        const word = this.dictionary.find((word) => word === pathLetters)
        if (word && !this.matchedWords.includes(word)) {
          // { pathLetters: '', path: [] }
          this.matchedWords.push(word)
        }
      } else {
        return
      }
    }

    node.connectedNodes.forEach((child) => {
      this.graphSearch(pathLetters, child, visited.slice(0))
    })
  }
}

export default Graph
