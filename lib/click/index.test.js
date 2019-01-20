/* @flow */
import test from 'ava'
import td from 'testdouble'
import React from 'react'
import { render, click } from 'test-tube'

test('filling in a text input', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <button onClick={onClick}>Click Me</button>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})
