import {act} from 'react-dom/test-utils'

export default function (root) {
  act(() => {
    root.unmount()
  })
}
