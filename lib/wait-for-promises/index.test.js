import test from 'ava'
import {useState} from 'react'
import {html} from 'htm/react/index.js'
import {render, click, waitForPromises} from '../../index.js'

test('waiting for promises', async (t) => {
  function Component() {
    const [text, setText] = useState('Nope')

    return html`
      <div>
        <span>${text}</span>
        <button
          onClick=${async () => {
            await Promise.resolve()
            setText('Yep')
          }}
        >
          Set Text
        </button>
      </div>
    `
  }

  const container = render(html`<${Component} />`)
  t.true(container.textContent.includes('Nope'))

  click(container, 'Set Text')
  await waitForPromises()
  t.true(container.textContent.includes('Yep'))
})
