import test from 'ava'
import * as td from 'testdouble'
import {useState, useEffect} from 'react'
import {html} from 'htm/react'
import {render, findElement, fillIn} from '../../index.js'

test('filling in a text input', (t) => {
  const onChange = td.func()
  const {container} = render(html`
    <div>
      <label htmlFor="username">Username</label>
      <input id="username" onChange=${onChange} />
    </div>
  `)

  fillIn(container, 'Username', 'example-user')
  td.verify(onChange(td.matchers.contains({target: {value: 'example-user'}})))

  t.pass()
})

test('interacting correctly with React component with hooks', (t) => {
  function Component() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    useEffect(() => {
      setText(`Changed: ${count}`)
    }, [count])

    return html`
      <div>
        <label>
          Input
          <input onChange=${() => setCount((c) => c + 1)} />
        </label>
        <div className="text">${text}</div>
      </div>
    `
  }

  const {container} = render(html`<${Component} />`)
  fillIn(container, 'Input', 'One')
  t.is(findElement(container, '.text').textContent, 'Changed: 1')

  fillIn(container, 'Input', 'Two')
  t.is(findElement(container, '.text').textContent, 'Changed: 2')
})
