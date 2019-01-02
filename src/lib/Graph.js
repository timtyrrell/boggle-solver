import Node from './Node'

class Graph {
  constructor(boardSize, boggleLetters) {
    this.boardSize = Number(boardSize)
    this.boggleLetters = boggleLetters
    this.nodes =  this.createNodes(this.boardSize, boggleLetters)
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
          if (!connectedNodes.includes(`${rowPosition},${columnOffsetPosition}`)) {
            connectedNodes.push(`${rowPosition},${columnOffsetPosition}`)
          }
        }

        if (rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnPosition]) {
          if (!connectedNodes.includes(`${rowOffsetPosition},${columnPosition}`)) {
            connectedNodes.push(`${rowOffsetPosition},${columnPosition}`)
          }
        }

        if(columnOffsetPosition >= 0 && columnOffsetPosition <= boardSize && rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnOffsetPosition]) {
          if (!connectedNodes.includes(`${rowOffsetPosition},${columnOffsetPosition}`)) {
            connectedNodes.push(`${rowOffsetPosition},${columnOffsetPosition}`)
          }
        }
      })
    })
    return connectedNodes
  }
}

export default Graph
