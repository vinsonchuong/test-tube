import test from 'ava'
import {html} from 'htm/react'
import {render, findInput} from '../../index.js'

test('finding an input with a label associated via for attribute', (t) => {
  const {container} = render(html`
    <div>
      <label htmlFor="username">Username</label>
      <input id="username" />
    </div>
  `)

  t.is(findInput(container, 'Username').tagName, 'INPUT')
})

test('finding a hidden input associated via for attribute', (t) => {
  const {container} = render(html`
    <div>
      <label htmlFor="currency">Currency</label>
      <input id="currency" type="hidden" />
    </div>
  `)

  t.is(findInput(container, 'Currency').tagName, 'INPUT')
})

test('finding a hidden input contained within a label', (t) => {
  const {container} = render(html`
    <div>
      <label>
        Currency
        <input type="hidden" />
      </label>
    </div>
  `)

  t.is(findInput(container, 'Currency').tagName, 'INPUT')
})

test('finding an input contained within a label', (t) => {
  const {container} = render(html`
    <div>
      <label>
        Username
        <input />
      </label>
    </div>
  `)

  t.is(findInput(container, 'Username').tagName, 'INPUT')
})
