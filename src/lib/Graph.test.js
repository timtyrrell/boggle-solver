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
  expect(graph.nodes).toMatchSnapshot()
})
