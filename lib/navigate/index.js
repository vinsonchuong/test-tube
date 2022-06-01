import path from 'node:path'
import {act} from 'react-dom/test-utils'

export default function (pathname) {
  act(() => {
    global.jsdom.reconfigure({
      url: path.join('http://example.com', pathname),
    })
    global.window.dispatchEvent(new window.PopStateEvent('popstate'))
  })
}
