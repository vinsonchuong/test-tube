/* @flow */
import { findElement } from 'test-tube'

export default function(
  container: HTMLElement,
  labelText: string
): HTMLInputElement {
  const label = findElement(container, 'label', labelText)

  if (!(label instanceof window.HTMLLabelElement)) {
    throw new Error('Unable to find label with given text')
  }

  if (!(label.control instanceof window.HTMLInputElement)) {
    throw new Error('Label is not associated with an input')
  }

  return label.control
}
