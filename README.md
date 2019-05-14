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

Note that JavaScript referenced using `<script>` tags will be downloaded and
executed.

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

### `findElements(container, cssSelector)`
Find all elements matching a CSS selector

```js
import React from 'react'
import { render, findElements } from 'test-tube'

const container = render(
  <div>
    <button>Submit</button>
    <button>Sign Up</button>
  </div>
)

const buttons = findElement(container, 'button')
```

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

`findElement` searches the `textContent`, `aria-label` and `value` for the given
text.

### `findInput(container, labelText)`
Find an input element by its associated label

```js
import React from 'react'
import { render, findInput } from 'test-tube'

const container = render(
  <div>
    <label htmlFor="email">Email</label>
    <input id="email" />
  </div>
)

const emailInput = findInput(container, 'Email')
```

If a matching element cannot be found, an exception is thrown.

### `click(container, containedText)`
Click on a button or link containing the given text

```js
import React from 'react'
import { render, click } from 'test-tube'

const container = render(
  <div>
    <button>Click Here</button>
  </div>
)

click(container, 'Click Here')
```

Only links and buttons (with the proper tag or ARIA role) are clickable.

In addition, if the button is the submit button for a form, an `onSubmit` event
will also be fired on the form.

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

### `check(container, labelText)`
Check an unchecked checkbox or radio button

```js
import React from 'react'
import { render, check } from 'test-tube'

const container = render(
  <div>
    <label for="confirm">Confirm</label>
    <input id="confirm" type="checkbox" />
  </div>
)

check(container, 'Username')
```

If the input is already checked, an exception will be thrown.

### `uncheck(container, labelText)`
Check an unchecked checkbox

```js
import React from 'react'
import { render, uncheck } from 'test-tube'

const container = render(
  <div>
    <label for="confirm">Confirm</label>
    <input id="confirm" type="checkbox" checked />
  </div>
)

uncheck(container, 'Username')
```

If the input is already unchecked, an exception will be thrown.

### `waitForPromises()`
Wait for pending Promises to be resolved.

```js
import React, { useState } from 'react'
import { render, format, click, waitForPromises } from 'test-tube'

function Component() {
  const [text, setText] = useState('Waiting')

  return (
    <div>
      <span>{text}</span>
      <button
        onClick={async () => {
          await Promise.resolve()
          setText('Done')
        }}
      >
        Do Work
      </button>
    </div>
  )
}

async function run() {
  const container = render(<Component />)
  click(container, 'Do Work')
  await waitForPromises()
  console.log(format(container))
}

run()
```
