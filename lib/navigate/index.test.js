import test from 'ava'
import {render, navigate} from '../../index.js'
import {Fragment, useState, useEffect} from 'react'
import {html} from 'htm/react/index.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'

test('navigating to a different URL', (t) => {
  const container = render(html`
    <${Fragment}>
      <${Router}>
        <${Fragment}>
          <${Route} exact path="/" render=${() => 'Home'} />
          <${Route} exact path="/one" render=${() => 'One'} />
          <${Route} exact path="/two" render=${() => 'Two'} />
        </${Fragment}>
      </${Router}>
    </${Fragment}>
  `)

  t.true(container.textContent.includes('Home'))

  navigate('/one')
  t.true(container.textContent.includes('One'))

  navigate('/two')
  t.true(container.textContent.includes('Two'))
})

test('navigating and triggering hooks', (t) => {
  function Component() {
    const [text, setText] = useState('')

    useEffect(() => {
      setText('Hello')
    }, [])

    return text
  }

  const container = render(html`
    <${Fragment}>
      <${Router}>
        <${Fragment}>
          <${Route} exact path="/" render=${() => 'Home'} />
          <${Route} exact path="/one" component=${Component} />
        </${Fragment}>
      </${Router}>
    </${Fragment}>
  `)

  navigate('/one')
  t.true(container.textContent.includes('Hello'))
})
