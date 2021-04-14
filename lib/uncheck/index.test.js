import test from 'ava'
import * as td from 'testdouble'
import {useState, useEffect} from 'react'
import {html} from 'htm/react/index.js'
import {render, findElement, uncheck} from '../../index.js'

test('unchecking a checkbox', (t) => {
  const onChange = td.func()
  const container = render(html`
    <div>
      <label htmlFor="confirm">Confirm</label>
      <input id="confirm" type="checkbox" onChange=${onChange} checked />
    </div>
  `)

  uncheck(container, 'Confirm')
  td.verify(onChange(td.matchers.contains({target: {checked: false}})))
  t.pass()
})

test('throwing an error when the checkbox is already unchecked', (t) => {
  const onChange = td.func()
  const container = render(html`
    <div>
      <label htmlFor="confirm">Confirm</label>
      <input id="confirm" type="checkbox" onChange=${onChange} />
    </div>
  `)

  t.throws(() => uncheck(container, 'Confirm'))
  td.verify(onChange(), {ignoreExtraArgs: true, times: 0})
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
          <input
            type="checkbox"
            onChange=${() => setCount((c) => c + 1)}
            checked
          />
        </label>
        <div className="text">${text}</div>
      </div>
    `
  }

  const container = render(html`<${Component} />`)
  t.is(findElement(container, '.text').textContent, 'Changed: 0')

  uncheck(container, 'Input')
  t.is(findElement(container, '.text').textContent, 'Changed: 1')
})
