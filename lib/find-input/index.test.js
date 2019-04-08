/* @flow */
import test from 'ava'
import React from 'react'
import { render, findInput } from 'test-tube'

test('finding an input with a label associated via for attribute', t => {
  const container = render(
    <div>
      <label htmlFor="username">Username</label>
      <input id="username" />
    </div>
  )

  t.is(findInput(container, 'Username').tagName, 'INPUT')
})

test('filling in a text input contained within a label', t => {
  const container = render(
    <div>
      <label>
        Username
        <input />
      </label>
    </div>
  )

  t.is(findInput(container, 'Username').tagName, 'INPUT')
})
