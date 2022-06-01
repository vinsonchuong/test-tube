import {Simulate, act} from 'react-dom/test-utils'
import {findInput} from '../../index.js'

export default function (container, labelText) {
  act(() => {
    const input = findInput(container, labelText)

    if (!input.checked) {
      throw new Error('Input is already unchecked')
    }

    Simulate.change(input, {target: {checked: false}})
  })
}
