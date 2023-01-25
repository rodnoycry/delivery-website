import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import { Test } from './Test'

Enzyme.configure({ adapter: new Adapter() })

it('App shows "Hello Alex!"', () => {
    const app = shallow(<Test name="Alex" />)
    expect(app.text()).toBe('Hello Alex!')
})
