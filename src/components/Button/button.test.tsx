import React from 'react'
import {render} from '@testing-library/react'
import Button from './button'

test('should ', () => {
  const wrapper = render(<Button>123</Button>)
  const el = wrapper.queryByText('123')
  expect(el).toBeTruthy()
})
