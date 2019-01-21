/* @flow */
import test from 'ava'
import td from 'testdouble'
import React from 'react'
import { render, fillIn } from 'test-tube'

test('filling in a text input with a label associated via for attribute', t => {
  const onChange = td.func()
  const container = render(
    <div>
      <label htmlFor="username">Username</label>
      <input id="username" onChange={onChange} />
    </div>
  )

  fillIn(container, 'Username', 'example-user')
  td.verify(
    onChange(td.matchers.contains({ target: { value: 'example-user' } }))
  )

  t.pass()
})

test('filling in a text input contained within a label', t => {
  const onChange = td.func()
  const container = render(
    <div>
      <label>
        Username
        <input onChange={onChange} />
      </label>
    </div>
  )

  fillIn(container, 'Username', 'example-user')
  td.verify(
    onChange(td.matchers.contains({ target: { value: 'example-user' } }))
  )

  t.pass()
})
