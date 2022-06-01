import test from 'ava'
import {useEffect} from 'react'
import {html} from 'htm/react'
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

  const {root} = render(html`<${Component} />`)
  t.true(mounted)

  unrender(root)
  t.false(mounted)
})
