import {Simulate, act} from 'react-dom/test-utils'
import {findInput} from '../../index.js'

export default function (container, labelText) {
  act(() => {
    const input = findInput(container, labelText)

    if (input.checked) {
      throw new Error('Input is already checked')
    }

    Simulate.change(
      input,
      input.type === 'radio'
        ? {target: {checked: true, value: input.value}}
        : {target: {checked: true}},
    )
  })
}
