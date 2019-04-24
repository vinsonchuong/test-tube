/* @flow */
import test from 'ava'
import { createServer } from 'http'
import getPort from 'get-port'
import loadScript from 'dynamic-script'
import setupJsdom from './'

test('loading external scripts', async t => {
  const port = await getPort()
  const server = createServer((request, response) => {
    response.end('window.loadedScriptExecuted = true')
  })
  server.listen(port)
  await new Promise(resolve => server.on('listening', resolve))

  setupJsdom()
  await loadScript(`http://localhost:${port}`)

  t.true(window.loadedScriptExecuted)

  await new Promise(resolve => server.close(resolve))
})
