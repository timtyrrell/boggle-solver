import React from 'react'
import Graph from './Graph'

const boardSize = '4'
const formattedLetters = [
  ['a','p','p','x'],
  ['x','x','l','x'],
  ['n','x','e','x'],
  ['x','x','x','Z']
]

it('verifies defaults', () => {
  const graph = new Graph(boardSize, formattedLetters)
  expect(graph.boardSize).toEqual(4)
  expect(graph.nodes.length).toEqual(16)
  expect(graph.nodes[0].value).toEqual('a')
})


// [0,0] = [0,1], [1,0], [1,1]
// [0,1] = [0,0], [0, 2], [1,0], [1,1]
// [1,1] = [0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]
// [2,2] = [1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]
it('generates a correct connected node list', () => {
  const graph = new Graph(boardSize, formattedLetters)
  expect(graph.nodes[0].connectedNodes.length).toEqual(3)
  expect(graph.nodes[0].connectedNodes).toEqual(['0,1', '1,0', '1,1'])
})
