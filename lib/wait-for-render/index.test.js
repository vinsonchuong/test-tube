// @flow
import test from 'ava'
import React, { useState, useEffect } from 'react'
import { render, waitForRender } from 'test-tube'

test('waiting for a component to re-render', async t => {
  function Component() {
    const [number, setNumber] = useState(0)
    useEffect(() => {
      setTimeout(() => {
        setNumber(1)
      }, 500)
    })

    return <div>{number}</div>
  }

  const container = render(<Component />)
  t.is(container.textContent, '0')

  await waitForRender(container)
  t.is(container.textContent, '1')
})

test('timing out if a component takes too long to re-render', async t => {
  function Component() {
    const [number, setNumber] = useState(0)
    useEffect(() => {
      setTimeout(() => {
        setNumber(1)
      }, 500)
    })

    return <div>{number}</div>
  }

  const container = render(<Component />)
  t.is(container.textContent, '0')

  await t.throwsAsync(waitForRender(container, 300))
})
