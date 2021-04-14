import {Simulate, act} from 'react-dom/test-utils.js'
import {findInput} from '../../index.js'

export default function (container, labelText, value) {
  act(() => {
    const input = findInput(container, labelText)
    input.value = value
    Simulate.change(input)
  })
}
