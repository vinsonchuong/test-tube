/* @flow */
import test from 'ava'
import td from 'testdouble'
import React from 'react'
import { render, click } from 'test-tube'

test('clicking on a button', t => {
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

test('clicking on a button where the text is inside extra elements', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <button onClick={onClick}>
        <span>Click Me</span>
      </button>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('clicking on a button input', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <input type="button" value="Click Me" onClick={onClick} />
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})
