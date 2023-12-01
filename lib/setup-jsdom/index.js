import {JSDOM} from 'jsdom'
import keys from 'jsdom-global/keys.js'

const jsdom = new JSDOM('<!doctype html><meta charset="utf-8">', {
  url: 'http://example.com',
  pretendToBeVisual: true,
  resources: 'usable',
  runScripts: 'dangerously',
})

for (const key of keys) {
  if (!(key in globalThis)) {
    globalThis[key] = jsdom.window[key]
  }
}

globalThis.jsdom = jsdom
globalThis.window = jsdom.window
globalThis.document = jsdom.window.document
