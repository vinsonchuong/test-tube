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

### `render(jsx)`
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
