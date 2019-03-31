/* @flow */
import test from 'ava'
import React from 'react'
import { render, format } from 'test-tube'

test('formatting an element', t => {
  const container = render(
    <div>
      <div>Hello</div>
    </div>
  )

  t.is(
    format(container),
    '<div>\n  <div>\n    <div>Hello</div>\n  </div>\n</div>'
  )
})
