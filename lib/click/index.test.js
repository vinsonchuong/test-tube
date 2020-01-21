/* @flow */
import test from 'ava'
import td from 'testdouble'
import React, { useState, useEffect } from 'react'
import { render, findElement, click } from 'test-tube'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

test('clicking on a button', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <button onClick={onClick}>Click Me</button>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('failing to click on a disabled button', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <button disabled onClick={onClick}>
        Click Me
      </button>
    </div>
  )

  t.throws(() => click(container, 'Click Me'))
  td.verify(onClick(), { times: 0, ignoreExtraArgs: true })
})

test('clicking on a button where the text is inside extra elements', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <button onClick={onClick}>
        <span>Click Me</span>
      </button>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('clicking on a button input', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <input type="button" value="Click Me" onClick={onClick} />
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('failing to click on a disabled button input', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <input disabled type="button" value="Click Me" onClick={onClick} />
    </div>
  )

  t.throws(() => click(container, 'Click Me'))
  td.verify(onClick(), { times: 0, ignoreExtraArgs: true })
})

test('clicking on a menu item', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <div role="menuitem" onClick={onClick}>
        Click Me
      </div>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('clicking on a custom select item', t => {
  const onClick = td.func()
  const container = render(
    <div>
      <div role="option" onClick={onClick}>
        Click Me
      </div>
    </div>
  )

  click(container, 'Click Me')
  td.verify(onClick(), { ignoreExtraArgs: true })

  t.pass()
})

test('also firing a submit event if the button is a submit button for a form', t => {
  const onSubmit = td.func()
  const onClick = td.func()
  const container = render(
    <form onSubmit={onSubmit}>
      <button type="submit" onClick={onClick}>
        Click Me
      </button>
    </form>
  )
  click(container, 'Click Me')

  td.verify(onClick(), { ignoreExtraArgs: true })
  td.verify(onSubmit(), { ignoreExtraArgs: true })

  t.pass()
})

test('also firing a submit event if the button is a submit input for a form', t => {
  const onSubmit = td.func()
  const onClick = td.func()
  const container = render(
    <form onSubmit={onSubmit}>
      <input type="submit" value="Click Me" onClick={onClick} />
    </form>
  )
  click(container, 'Click Me')

  td.verify(onClick(), { ignoreExtraArgs: true })
  td.verify(onSubmit(), { ignoreExtraArgs: true })

  t.pass()
})

test('not firing a submit event if the button is disabled', t => {
  const onSubmit = td.func()
  const container = render(
    <form onSubmit={onSubmit}>
      <button type="submit" disabled>
        Click Me
      </button>
    </form>
  )

  t.throws(() => click(container, 'Click Me'))
  td.verify(onSubmit(), { ignoreExtraArgs: true, times: 0 })
})

test('not firing a submit event if the submit input is disabled', t => {
  const onSubmit = td.func()
  const container = render(
    <form onSubmit={onSubmit}>
      <input type="submit" disabled value="Click Me" />
    </form>
  )

  t.throws(() => click(container, 'Click Me'))
  td.verify(onSubmit(), { ignoreExtraArgs: true, times: 0 })
})

test('interacting correctly with React component with hooks', t => {
  function Component() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    useEffect(() => {
      setText(`Clicked: ${count}`)
    }, [count])

    return (
      <div>
        <button onClick={() => setCount(c => c + 1)}>Click</button>
        <div className="text">{text}</div>
      </div>
    )
  }

  const container = render(<Component />)
  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked: 1')

  click(container, 'Click')
  t.is(findElement(container, '.text').textContent, 'Clicked: 2')
})

test('clicking on a React Router Link', t => {
  const container = render(
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Link to="/clicked">Click Here</Link>}
        />
        <Route exact path="/clicked" render={() => <p>Clicked</p>} />
      </Switch>
    </Router>
  )

  click(container, 'Click Here')
  t.true(container.textContent.includes('Clicked'))
})
