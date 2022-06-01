import {createRoot} from 'react-dom/client'
import {act} from 'react-dom/test-utils'

export default function (jsx, container = document.createElement('div')) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  const root = createRoot(container)
  act(() => {
    root.render(jsx)
  })
  return {container, root}
}
