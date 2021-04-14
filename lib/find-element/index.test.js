import test from 'ava'
import {html} from 'htm/react/index.js'
import {render, findElement} from '../../index.js'

test('finding the first element element matching a CSS selector', (t) => {
  const container = render(html`
    <div>
      <span className="target">Hello</span>
      <span className="target">Bye</span>
    </div>
  `)

  const element = findElement(container, '.target')
  t.is(element.textContent, 'Hello')
})

test('finding the first element matching CSS selector and contained text', (t) => {
  const container = render(html`
    <div>
      <span className="target">Hello</span>
      <span className="target">Bye</span>
      <span className="target">Bye Bye</span>
    </div>
  `)

  const element = findElement(container, '.target', 'Bye')
  t.is(element.textContent, 'Bye')
})

test('finding inputs containing text', (t) => {
  const container = render(html`
    <div>
      <input type="button" value="Hello" />
    </div>
  `)

  const element = findElement(container, 'input', 'Hello')
  t.is(element.tagName, 'INPUT')
})

test('finding elements with accessibility labels', (t) => {
  const container = render(html`
    <div>
      <button aria-label="Hello" />
    </div>
  `)

  const element = findElement(container, 'button', 'Hello')
  t.is(element.tagName, 'BUTTON')
})

test('throwing an error if an element cannot be found', (t) => {
  const container = render(html`<div />`)

  t.throws(() => findElement(container, 'span'))
  t.throws(() => findElement(container, 'div', 'Not There'))
})
