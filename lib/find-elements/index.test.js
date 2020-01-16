/* @flow */
import test from 'ava'
import React from 'react'
import { render, findElements } from 'test-tube'

test('finding elements by selector', t => {
  const container = render(
    <div>
      <button>Submit</button>
      <button>Sign Up</button>
    </div>
  )

  t.deepEqual(
    findElements(container, 'button').map(b => b.textContent),
    ['Submit', 'Sign Up']
  )
})
