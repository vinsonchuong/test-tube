/* @flow */
import test from 'ava'
import React, { useState, useEffect } from 'react'
import { render, click, findElement } from 'test-tube'

test('rendering a React element', t => {
  const container = render(<div>Hello World!</div>)
  t.is(container.textContent, 'Hello World!')
})

test('making localStorage available', t => {
  window.localStorage.setItem('key', 'value')
  t.is(window.localStorage.getItem('key'), 'value')
})

test('rendering a React component with hooks', t => {
  function Component() {
    const [text, setText] = useState('')

    useEffect(() => {
      setText('Hello')
    }, [])

    return (
      <div>
        <button onClick={() => setText('Clicked')}>Click</button>
        <div className="text">{text}</div>
      </div>
    )
  }

  const container = render(<Component />)
  t.is(findElement(container, '.text').textContent, 'Hello')

  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked')
})
