import test from 'ava'
import {useState, useEffect} from 'react'
import {html} from 'htm/react'
import {render, click, findElement} from '../../index.js'

test('rendering a React element', (t) => {
  const {container} = render(html`<div>Hello World!</div>`)
  t.is(container.textContent, 'Hello World!')
})

test('making localStorage available', (t) => {
  window.localStorage.setItem('key', 'value')
  t.is(window.localStorage.getItem('key'), 'value')
})

test('rendering a React component with hooks', (t) => {
  function Component() {
    const [text, setText] = useState('')

    useEffect(() => {
      setText('Hello')
    }, [])

    return html`
      <div>
        <button onClick=${() => setText('Clicked')}>Click</button>
        <div className="text">${text}</div>
      </div>
    `
  }

  const {container} = render(html`<${Component} />`)
  t.is(findElement(container, '.text').textContent, 'Hello')

  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked')
})
