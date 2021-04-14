import {act} from 'react-dom/test-utils.js'
import {unmountComponentAtNode} from 'react-dom'

export default function (container) {
  act(() => {
    unmountComponentAtNode(container)
  })
}
