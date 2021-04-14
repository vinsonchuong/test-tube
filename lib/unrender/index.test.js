import test from 'ava'
import {useEffect} from 'react'
import {html} from 'htm/react/index.js'
import {render, unrender} from '../../index.js'

test('unrendering a component', (t) => {
  let mounted = false
  function Component() {
    useEffect(() => {
      mounted = true
      return () => {
        mounted = false
      }
    })

    return html`<div>Component</div>`
  }

  const container = render(html`<${Component} />`)
  t.true(mounted)

  unrender(container)
  t.false(mounted)
})
