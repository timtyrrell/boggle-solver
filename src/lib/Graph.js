import Node from './Node'

class Graph {
  constructor(boardSize, boggleLetters, dictionary = []) {
    this.boardSize = Number(boardSize)
    this.boggleLetters = boggleLetters
    this.nodes =  this.createNodes(this.boardSize, boggleLetters)
    this.dictionary = dictionary
    this.matchedWords = []
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

  findWordMatches(pathLetters = '', nodePosition = '00', visited = []) {
    if (visited.includes(nodePosition)) return
    visited.push(nodePosition)

    const row = Number(nodePosition.slice(0,1))
    const column = Number(nodePosition.slice(1,2))
    const node = this.nodes.find((node) => node.rowPosition === row && node.columnPosition === column)
    pathLetters += node.value

    // need length logic for 5x5 and 6x6
    if (pathLetters.length > 3) {
      const word = this.dictionary.find((word) => word === pathLetters)
      if (word) this.matchedWords.push(word)
    }

    node.connectedNodes.forEach((child) => {
      const row = Number(child.slice(0,1))
      const column = Number(child.slice(1,2))
      const foundChild = this.nodes.find((node) => node.rowPosition === row && node.columnPosition === column)
      this.findWordMatches(pathLetters, `${foundChild.rowPosition}${foundChild.columnPosition}`, visited)
    })
  }
}

export default Graph
