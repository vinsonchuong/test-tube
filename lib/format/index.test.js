import test from 'ava'
import {html} from 'htm/react'
import {render, format} from '../../index.js'

test('formatting an element', (t) => {
  const {container} = render(html`
    <div>
      <div>Hello</div>
    </div>
  `)

  t.is(
    format(container),
    '<div>\n  <div>\n    <div>Hello</div>\n  </div>\n</div>',
  )
})
