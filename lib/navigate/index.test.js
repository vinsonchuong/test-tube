/* @flow */
import test from 'ava'
import { render, navigate } from 'test-tube'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

test('navigating to a different URL', t => {
  const container = render(
    <>
      <Router>
        <>
          <Route exact path="/" render={() => 'Home'} />
          <Route exact path="/one" render={() => 'One'} />
          <Route exact path="/two" render={() => 'Two'} />
        </>
      </Router>
    </>
  )

  t.true(container.textContent.includes('Home'))

  navigate('/one')
  t.true(container.textContent.includes('One'))

  navigate('/two')
  t.true(container.textContent.includes('Two'))
})

test('navigating and triggering hooks', t => {
  function Component() {
    const [text, setText] = useState('')

    useEffect(() => {
      setText('Hello')
    }, [])

    return text
  }

  const container = render(
    <>
      <Router>
        <>
          <Route exact path="/" render={() => 'Home'} />
          <Route exact path="/one" component={Component} />
        </>
      </Router>
    </>
  )

  navigate('/one')
  t.true(container.textContent.includes('Hello'))
})
