/* @flow */
/* eslint-disable no-undef */
import { Simulate } from 'react-dom/test-utils'

export default function(
  container: HTMLElement,
  labelText: string,
  value: string
): void {
  const label = Array.from(container.querySelectorAll('label')).find(element =>
    element.textContent.includes(labelText)
  )

  if (!(label instanceof HTMLLabelElement)) {
    throw new Error('Unable to find label with given text')
  }

  if (!(label.control instanceof HTMLInputElement)) {
    throw new Error('Label is not associated with an input')
  }

  label.control.value = value
  Simulate.change(label.control)
}
