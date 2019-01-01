import Node from './Node'

class Graph {
  constructor(boardSize, boggleLetters) {
    this.boardSize = Number(boardSize)
    this.boggleLetters = boggleLetters
    this.nodes =  this.createNodes(boardSize, boggleLetters)
  }

  createNodes(boardSize, boggleLetters) {
    const nodes = []

    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        nodes.push(new Node (boggleLetters[x][y]))
      }
    }
    return nodes
  }
}

export default Graph
