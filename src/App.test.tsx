import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
const assert = require('chai').assert

import { fToC } from '../src/helpers/helpers'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText('Weather App')).toBeInTheDocument()
})

describe('fToC', function() {
  it('should return a value in celsius', function() {
    assert.equal(fToC(100), '37.8')
  })
})
