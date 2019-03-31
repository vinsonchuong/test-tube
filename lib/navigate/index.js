/* @flow */
import * as path from 'path'
import { act } from 'react-dom/test-utils'

export default function(pathname: string): void {
  act(() => {
    global.jsdom.reconfigure({
      url: path.join('http://example.com', pathname)
    })
    global.window.dispatchEvent(new window.PopStateEvent('popstate'))
  })
}
