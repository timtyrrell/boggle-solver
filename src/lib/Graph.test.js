import React from 'react'
import Graph from './Graph'

const boardSize = '4'
const formattedLetters = [
  ['a','p','p','l'],
  ['e','x','e','e'],
  ['n','x','e','x'],
  ['x','x','x','Z']
]

const dictionary = ['aa', 'apple']

it('verifies defaults', () => {
  const graph = new Graph(boardSize, formattedLetters)
  expect(graph.boardSize).toEqual(4)
  expect(graph.nodes.length).toEqual(16)
  expect(graph.nodes[0].value).toEqual('a')
})


// [0,0] = [0,1], [1,0], [1,1]
// [1,1] = [0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]
it('generates a correct connected node list', () => {
  const graph = new Graph(boardSize, formattedLetters)
  // [0,0]
  expect(graph.nodes[0].connectedNodes.length).toEqual(3)
  expect(graph.nodes[0].connectedNodes).toEqual(['01', '10', '11'])
  // [1,1]
  expect(graph.nodes[5].connectedNodes.length).toEqual(8)
  expect(graph.nodes[5].connectedNodes).toEqual(
    ['00', '01', '02', '10', '12', '20', '21', '22']
  )
})

it('walks the graph to find matches', () => {
  const graph = new Graph(boardSize, formattedLetters, dictionary)
  graph.findWordMatches()
  expect(graph.matchedWords).toEqual(['apple'])
})
