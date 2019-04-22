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

  const input =
    label.control ||
    (label.htmlFor && findElement(container, `#${label.htmlFor}`)) ||
    label.querySelector('input')

  if (!input || !(input instanceof window.HTMLInputElement)) {
    throw new Error('Label is not associated with an input')
  }

  return input
}
