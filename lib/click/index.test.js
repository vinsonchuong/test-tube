import test from 'ava'
import * as td from 'testdouble'
import {useState, useEffect} from 'react'
import {html} from 'htm/react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {render, findElement, click} from '../../index.js'

test('clicking on a button', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <button onClick=${onClick}>Click Me</button>
    </div>
  `)

  click(container, 'Click Me')
  td.verify(onClick(), {ignoreExtraArgs: true})

  t.pass()
})

test('failing to click on a disabled button', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <button disabled onClick=${onClick}>Click Me</button>
    </div>
  `)

  t.throws(() => click(container, 'Click Me'))
  td.verify(onClick(), {times: 0, ignoreExtraArgs: true})
})

test('clicking on a button where the text is inside extra elements', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <button onClick=${onClick}>
        <span>Click Me</span>
      </button>
    </div>
  `)

  click(container, 'Click Me')
  td.verify(onClick(), {ignoreExtraArgs: true})

  t.pass()
})

test('clicking on a button input', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <input type="button" value="Click Me" onClick=${onClick} />
    </div>
  `)

  click(container, 'Click Me')
  td.verify(onClick(), {ignoreExtraArgs: true})

  t.pass()
})

test('failing to click on a disabled button input', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <input disabled type="button" value="Click Me" onClick=${onClick} />
    </div>
  `)

  t.throws(() => click(container, 'Click Me'))
  td.verify(onClick(), {times: 0, ignoreExtraArgs: true})
})

test('clicking on a menu item', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <div role="menuitem" onClick=${onClick}>Click Me</div>
    </div>
  `)

  click(container, 'Click Me')
  td.verify(onClick(), {ignoreExtraArgs: true})

  t.pass()
})

test('clicking on a custom select item', (t) => {
  const onClick = td.func()
  const {container} = render(html`
    <div>
      <div role="option" onClick=${onClick}>Click Me</div>
    </div>
  `)

  click(container, 'Click Me')
  td.verify(onClick(), {ignoreExtraArgs: true})

  t.pass()
})

test('also firing a submit event if the button is a submit button for a form', (t) => {
  const onSubmit = td.func()
  const onClick = td.func()
  const {container} = render(html`
    <form onSubmit=${onSubmit}>
      <button type="submit" onClick=${onClick}>Click Me</button>
    </form>
  `)
  click(container, 'Click Me')

  td.verify(onClick(), {ignoreExtraArgs: true})
  td.verify(onSubmit(), {ignoreExtraArgs: true})

  t.pass()
})

test('also firing a submit event if the button is a submit input for a form', (t) => {
  const onSubmit = td.func()
  const onClick = td.func()
  const {container} = render(html`
    <form onSubmit=${onSubmit}>
      <input type="submit" value="Click Me" onClick=${onClick} />
    </form>
  `)
  click(container, 'Click Me')

  td.verify(onClick(), {ignoreExtraArgs: true})
  td.verify(onSubmit(), {ignoreExtraArgs: true})

  t.pass()
})

test('not firing a submit event if the button is disabled', (t) => {
  const onSubmit = td.func()
  const {container} = render(html`
    <form onSubmit=${onSubmit}>
      <button type="submit" disabled>Click Me</button>
    </form>
  `)

  t.throws(() => click(container, 'Click Me'))
  td.verify(onSubmit(), {ignoreExtraArgs: true, times: 0})
})

test('not firing a submit event if the submit input is disabled', (t) => {
  const onSubmit = td.func()
  const {container} = render(html`
    <form onSubmit=${onSubmit}>
      <input type="submit" disabled value="Click Me" />
    </form>
  `)

  t.throws(() => click(container, 'Click Me'))
  td.verify(onSubmit(), {ignoreExtraArgs: true, times: 0})
})

test('interacting correctly with React component with hooks', (t) => {
  function Component() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    useEffect(() => {
      setText(`Clicked: ${count}`)
    }, [count])

    return html`
      <div>
        <button onClick=${() => setCount((c) => c + 1)}>Click</button>
        <div className="text">${text}</div>
      </div>
    `
  }

  const {container} = render(html`<${Component} />`)
  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked: 1')

  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked: 2')
})

test('clicking on a React Router Link', (t) => {
  const {container} = render(html`
    <${Router}>
      <${Routes}>
        <${Route}
          path="/"
          element=${html`<${Link} to="/clicked">Click Here</${Link}>`}
        />
        <${Route} path="/clicked" element=${html`<p>Clicked</p>`} />
      </${Routes}>
    </${Router}>
  `)

  click(container, 'Click Here')
  t.true(container.textContent.includes('Clicked'))
})
