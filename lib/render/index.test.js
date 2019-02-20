/* @flow */
import test from 'ava'
import React from 'react'
import { render } from 'test-tube'

test('rending a React element', t => {
  const container = render(<div>Hello World!</div>)
  t.is(container.textContent, 'Hello World!')
})

test('making localStorage available', t => {
  window.localStorage.setItem('key', 'value')
  t.is(window.localStorage.getItem('key'), 'value')
})
