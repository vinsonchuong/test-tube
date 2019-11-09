/* @flow */
import setupJsdom from './lib/setup-jsdom'

setupJsdom()

export { default as render } from './lib/render'
export { default as unrender } from './lib/unrender'

export { default as navigate } from './lib/navigate'
export { default as waitForPromises } from './lib/wait-for-promises'

export { default as format } from './lib/format'
export { default as waitForRender } from './lib/wait-for-render'
export { default as findElements } from './lib/find-elements'
export { default as findElement } from './lib/find-element'
export { default as findInput } from './lib/find-input'
export { default as click } from './lib/click'
export { default as fillIn } from './lib/fill-in'
export { default as check } from './lib/check'
export { default as uncheck } from './lib/uncheck'
