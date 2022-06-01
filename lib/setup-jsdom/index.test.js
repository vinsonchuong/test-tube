import {createServer} from 'node:http'
import test from 'ava'
import getPort from 'get-port'
import loadScript from 'dynamic-script'
import './index.js'

test('loading external scripts', async (t) => {
  const port = await getPort()
  const server = createServer((request, response) => {
    response.end('window.loadedScriptExecuted = true')
  })
  server.listen(port)
  await new Promise((resolve) => {
    server.on('listening', resolve)
  })

  t.teardown(async () => {
    await new Promise((resolve) => {
      server.close(resolve)
    })
  })

  await loadScript(`http://localhost:${port}`)

  t.true(window.loadedScriptExecuted)
})
