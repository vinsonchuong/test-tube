// @flow
import test from 'ava'
import React, { useEffect } from 'react'
import { render, unrender } from 'test-tube'

test('unrendering a component', t => {
  let mounted = false
  function Component() {
    useEffect(() => {
      mounted = true
      return () => {
        mounted = false
      }
    })

    return <div>Component</div>
  }

  const container = render(<Component />)
  t.true(mounted)

  unrender(container)
  t.false(mounted)
})
