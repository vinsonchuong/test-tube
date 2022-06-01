import test from 'ava'
import {Fragment, useState, useEffect} from 'react'
import {html} from 'htm/react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {render, navigate} from '../../index.js'

test('navigating to a different URL', (t) => {
  navigate('/')

  const {container} = render(html`
    <${Fragment}>
      <${Router}>
        <${Routes}>
          <${Route} path="/" element="Home" />
          <${Route} path="/one" element="One" />
          <${Route} path="/two" element="Two" />
        </${Routes}>
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

  navigate('/')

  const {container} = render(html`
    <${Fragment}>
      <${Router}>
        <${Routes}>
          <${Route} path="/" element="Home" />
          <${Route} path="/one" element=${html`<${Component} />`} />
        </${Routes}>
      </${Router}>
    </${Fragment}>
  `)

  navigate('/one')
  t.true(container.textContent.includes('Hello'))
})
