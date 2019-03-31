# test-tube
![npm](https://img.shields.io/npm/v/test-tube.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/test-tube.svg?branch=master)](https://travis-ci.org/vinsonchuong/test-tube)
[![dependencies Status](https://david-dm.org/vinsonchuong/test-tube/status.svg)](https://david-dm.org/vinsonchuong/test-tube)
[![devDependencies Status](https://david-dm.org/vinsonchuong/test-tube/dev-status.svg)](https://david-dm.org/vinsonchuong/test-tube?type=dev)

Test React components from the point of view of a user

## Example
```js
import React from 'react'
import { render } from 'test-tube'

function run() {
  const container = render(
    <div>Hello World!</div>
  )

  console.log(container.innerHTML)
}

run()
```

## Installation
Install [test-tube](https://yarnpkg.com/en/package/test-tube)
by running:

```sh
yarn add test-tube
```

## API

### `render(jsx, [container])`
Render a React element, returning a `<div>` containing it

```js
import React from 'react'
import { render } from 'test-tube'

const container = render(
  <div>Hello World!</div>
)

console.log(container.innerHTML)
```

`render` attempts to run React components as if they were being run in a
browser for an actual user. It uses [jsdom](https://github.com/jsdom/jsdom) to
augment Node.js environments with support for browser APIs.

Optionally, a container (`HTMLElement`) to render into can be passed in (by
default, `render` creates a new `<div>`). This enables usecases like
re-rendering a component with different props.

### ```format(container)```
Format an element into an HTML string to help with debugging

```js
import React from 'react'
import { render, format } from 'test-tube'

const container = render(
  <div>Hello World!</div>
)

console.log(format(container))
```

### `navigate(pathname)`
Simulate a URL change.

```js
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render, format, navigate } from 'test-tube'

const container = render(
  <Router>
    <>
      <Route exact path='/' render={() => 'Home'} />
      <Route exact path='/one' render={() => 'One'} />
      <Route exact path='/two' render={() => 'Two'} />
    </>
  </Router>
)

console.log(format(container))

navigate('/one')
console.log(format(container))

navigate('/two')
console.log(format(container))
```

`navigate` changes `window.location` to match the given path and then dispatches
a `popstate` event, which is verified to work with `react-router-dom`.

### `findElement(container, cssSelector, containedText)`
Find the first element matching a CSS selector and optionally, containing some
text

```js
import React from 'react'
import { render, findElement } from 'test-tube'

const container = render(
  <div>
    <button>Submit</button>
    <button>Sign Up</button>
  </div>
)

const submitButton findElement(container, 'button')
const signUpButton = findElement(container, 'button', 'Sign Up')
```

If a matching element cannot be found, an exception is thrown.

### `click(container, containedText)`
Click on a button or link containing the given text

```js
import React from 'react'
import { render, fillIn } from 'test-tube'

const container = render(
  <div>
    <button>Click Here</button>
  </div>
)

click(container, 'Click Here')
```

Only links and buttons (with the proper tag or ARIA role) are clickable.

### `fillIn(container, labelText, value)`
Find a form field by label and change its value.

```js
import React from 'react'
import { render, fillIn } from 'test-tube'

const container = render(
  <div>
    <label for="username">Username</label>
    <input id="username" />
  </div>
)

fillIn(container, 'Username', 'example-user')
```
