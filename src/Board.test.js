import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Board from './Board'

it('renders without crashing', () => {
  const component = renderer.create(<Board />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correct number of textboxes by default', () => {
  const checkbox = shallow(<Board />)
  expect(checkbox.find('input').length).toEqual(16)
})

it('renders correct number of textboxes on selection change', () => {
  const checkbox = shallow(<Board />)
  expect(checkbox.find('input').length).toEqual(16)

  checkbox.find('select').simulate('change', { target: { value: "5" } })
  expect(checkbox.find('input').length).toEqual(25)

  checkbox.find('select').simulate('change', { target: { value: "6" } })
  expect(checkbox.find('input').length).toEqual(36)
})
