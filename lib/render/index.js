import {render} from 'react-dom'
import {act} from 'react-dom/test-utils.js'

export default function (jsx, container = document.createElement('div')) {
  act(() => {
    render(jsx, container)
  })
  return container
}
