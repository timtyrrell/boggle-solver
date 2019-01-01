import React from 'react'
import Node from './Node'

it('verifies defaults', () => {
  const node = new Node('a')
  expect(node.value).toEqual('a')
})
