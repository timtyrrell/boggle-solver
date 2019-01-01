class Node {
  constructor(value, connectedNodes = []) {
    this.value = value
    this.connectedNodes = connectedNodes
  }
}

export default Node
