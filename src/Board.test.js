import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import Board from './Board'


it('renders without crashing', () => {
  const component = renderer.create(<Board />)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
