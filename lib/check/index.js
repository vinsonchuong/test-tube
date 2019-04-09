/* @flow */
import { Simulate, act } from 'react-dom/test-utils'
import { findInput } from 'test-tube'

export default function(container: HTMLElement, labelText: string): void {
  act(() => {
    const input = findInput(container, labelText)

    if (input.checked) {
      throw new Error('Input is already checked')
    }

    input.checked = true
    Simulate.change(input)
  })
}
