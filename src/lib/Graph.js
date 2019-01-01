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
            row,
            column,
            // this.generateConnectedNodeList(this.boggleLetters, row, column, this.boardSize)
          )
        )
      }
    }
    return nodes
  }
}

export default Graph
