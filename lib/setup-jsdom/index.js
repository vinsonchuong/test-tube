/* @flow */
import { JSDOM } from 'jsdom'
import keys from 'jsdom-global/keys'

export default function(): void {
  const jsdom = new JSDOM('<!doctype html><meta charset="utf-8">', {
    url: 'http://example.com',
    pretendToBeVisual: true,
    resources: 'usable',
    runScripts: 'dangerously'
  })

  for (const key of keys) {
    global[key] = jsdom.window[key]
  }

  global.jsdom = jsdom
  global.window = jsdom.window
  global.document = jsdom.window.document
}
