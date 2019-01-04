import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Board from './Board'
import Select from '@material-ui/core/Select'

it('renders without crashing', () => {
  const component = renderer.create(<Board />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// it('renders correct number of text boxes by default', () => {
//   const board = mount(<Board />)
//   expect(board.find('input[type="text"]').length).toEqual(16)
// })

// it('renders correct number of text boxes on selection change', () => {
//   const board = mount(<Board />)
//   expect(board.find('input[type="text"]').length).toEqual(16)

//   // console.log(board.find('div[role="button"]').html())
//   // console.log(board.find('input#boardType').html())
//   // board.find('div[role="button"]').simulate('change', { target: { value: "5" } })
//   // board.find('input#boardType').simulate('change', { target: { value: "5" } })
//   console.log(board
//     .find(Select)
//     .at(0)
//     .props()
// )
//   board
//     .find(Select)
//     .at(0)
//     .props()
//     .onChange({ target: { value: 5 } })

//   console.log(board
//     .find(Select)
//     .at(0)
//     .props()
// )
//   expect(board.find('input[type="text"]').length).toEqual(25)

//   // board.find('input#boardtype').simulate('change', { target: { value: "6" } })
//   // expect(board.find('input[type="text"]').length).toEqual(36)
// })
