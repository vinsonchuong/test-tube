/* @flow */
import test from 'ava'
import td from 'testdouble'
import React, { useState, useEffect } from 'react'
import { render, findElement, check } from 'test-tube'

test('checking a checkbox', t => {
  const onChange = td.func()
  const container = render(
    <div>
      <label htmlFor="confirm">Confirm</label>
      <input id="confirm" type="checkbox" onChange={onChange} />
    </div>
  )

  check(container, 'Confirm')
  td.verify(onChange(td.matchers.contains({ target: { checked: true } })))
  t.pass()
})

test('checking a radio button', t => {
  const onChange = td.func()
  const container = render(
    <div>
      <label htmlFor="confirm">Confirm</label>
      <input id="confirm" type="radio" onChange={onChange} value="confirm" />
    </div>
  )

  check(container, 'Confirm')
  td.verify(
    onChange(
      td.matchers.contains({ target: { checked: true, value: 'confirm' } })
    )
  )
  t.pass()
})

test('throwing an error when the checkbox is already checked', t => {
  const onChange = td.func()
  const container = render(
    <div>
      <label htmlFor="confirm">Confirm</label>
      <input id="confirm" type="checkbox" onChange={onChange} checked />
    </div>
  )

  t.throws(() => check(container, 'Confirm'))
  td.verify(onChange(), { ignoreExtraArgs: true, times: 0 })
})

test('interacting correctly with React component with hooks', t => {
  function Component() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    useEffect(() => {
      setText(`Changed: ${count}`)
    }, [count])

    return (
      <div>
        <label>
          Input
          <input type="checkbox" onChange={() => setCount(c => c + 1)} />
        </label>
        <div className="text">{text}</div>
      </div>
    )
  }

  const container = render(<Component />)
  t.is(findElement(container, '.text').textContent, 'Changed: 0')

  check(container, 'Input')
  t.is(findElement(container, '.text').textContent, 'Changed: 1')
})
