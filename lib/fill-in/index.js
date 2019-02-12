/* @flow */
/* eslint-disable no-undef */
import { Simulate } from 'react-dom/test-utils'
import { findElement } from 'test-tube'

export default function(
  container: HTMLElement,
  labelText: string,
  value: string
): void {
  const label = findElement(container, 'label', labelText)

  if (!(label instanceof HTMLLabelElement)) {
    throw new Error('Unable to find label with given text')
  }

  if (!(label.control instanceof HTMLInputElement)) {
    throw new Error('Label is not associated with an input')
  }

  label.control.value = value
  Simulate.change(label.control)
}
