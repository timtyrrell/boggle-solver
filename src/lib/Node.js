class Node {
  constructor(value, rowPosition, columnPosition, connectedNodes = []) {
    this.value = value
    this.connectedNodes = connectedNodes
    this.rowPosition = rowPosition
    this.columnPosition = columnPosition
  }
}

export default Node
