import test from 'ava'
import {html} from 'htm/react/index.js'
import {render, findElements} from '../../index.js'

test('finding elements by selector', (t) => {
  const container = render(html`
    <div>
      <button>Submit</button>
      <button>Sign Up</button>
    </div>
  `)

  t.deepEqual(
    findElements(container, 'button').map((b) => b.textContent),
    ['Submit', 'Sign Up']
  )
})
