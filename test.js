/* @flow */
import test from 'ava'
import greeting from 'test-tube'

test('exporting "Hello World!"', t => {
  t.is(greeting, 'Hello World!')
})
