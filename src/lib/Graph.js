import Node from './Node'

class Graph {
  constructor(boardSize, boggleLetters) {
    this.boardSize = Number(boardSize)
    this.boggleLetters = boggleLetters
    this.nodes =  this.createNodes(boardSize, boggleLetters)
  }

  createNodes(boardSize, boggleLetters) {
    const nodes = []

    for (let row = 0; row < boardSize; row++) {
      for (let column = 0; column < boardSize; column++) {
        nodes.push(new Node
          (
            boggleLetters[row][column],
            this.generateConnectedNodeList(boggleLetters, row, column, boardSize)
          )
        )
      }
    }
    return nodes
  }

  generateConnectedNodeList(boggleLetters, rowPosition, columnPosition, boardSize) {
    const connectedNodes = []

    if (rowPosition === 0 && columnPosition === 0) {
      [0, 1, -1].forEach((offset) => {
        const rowOffsetPosition = rowPosition + offset
        const columnOffsetPosition = columnPosition + offset

        if (rowOffsetPosition === rowPosition && columnOffsetPosition === columnPosition) return

        if (columnOffsetPosition >= 0 && columnOffsetPosition <= boardSize && boggleLetters[rowPosition][columnOffsetPosition]) {
          connectedNodes.push(`${rowPosition},${columnOffsetPosition}`)
          // console.log(`match: [${rowPosition}][${columnOffsetPosition}] with value: ${boggleLetters[rowPosition][columnOffsetPosition]}`)
        }

        if (rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnPosition]) {
          connectedNodes.push(`${rowOffsetPosition},${columnPosition}`)
          // console.log(`match: [${rowOffsetPosition}][${columnPosition}] with value: ${boggleLetters[rowOffsetPosition][columnPosition]}`)
        }

        if(columnOffsetPosition >= 0 && columnOffsetPosition <= boardSize && rowOffsetPosition >= 0 && rowOffsetPosition <= boardSize && boggleLetters[rowOffsetPosition][columnOffsetPosition]) {
          connectedNodes.push(`${rowOffsetPosition},${columnOffsetPosition}`)
          // console.log(`match: [${rowOffsetPosition}][${columnOffsetPosition}] with value: ${boggleLetters[rowOffsetPosition][columnOffsetPosition]}`)
        }
      })
    console.log(connectedNodes)
      return connectedNodes
    }
  }
}

export default Graph
