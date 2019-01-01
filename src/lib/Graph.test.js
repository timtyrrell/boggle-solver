import React from 'react'
import Graph from './Graph'

const boardSize = '4'
const letters = 'asdfwertyuhdyrhd'

it('verifies defaults', () => {
  const graph = new Graph(boardSize, letters)
  expect(graph.boardSize).toEqual(4)
  expect(graph.nodes.length).toEqual(16)
  expect(graph.nodes[0].value).toEqual('a')
})
