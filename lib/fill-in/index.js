/* @flow */
import { Simulate, act } from 'react-dom/test-utils'
import { findInput } from 'test-tube'

export default function(
  container: HTMLElement,
  labelText: string,
  value: string
): void {
  act(() => {
    const input = findInput(container, labelText)
    input.value = value
    Simulate.change(input)
  })
}
