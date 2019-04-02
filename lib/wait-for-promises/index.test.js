/* @flow */
import test from 'ava'
import React, { useState } from 'react'
import { render, click, waitForPromises } from 'test-tube'

test('waiting for promises', async t => {
  function Component() {
    const [text, setText] = useState('Nope')

    return (
      <div>
        <span>{text}</span>
        <button
          onClick={async () => {
            await Promise.resolve()
            setText('Yep')
          }}
        >
          Set Text
        </button>
      </div>
    )
  }

  const container = render(<Component />)
  t.true(container.textContent.includes('Nope'))

  click(container, 'Set Text')
  await waitForPromises()
  t.true(container.textContent.includes('Yep'))
})
