/* @flow */
import { findElements } from 'test-tube'

export default function(
  container: HTMLElement,
  cssSelector: string,
  containedText: ?string
): HTMLElement {
  const elements = findElements(container, cssSelector)

  const element =
    typeof containedText === 'string'
      ? elements.find(
          element =>
            // $FlowFixMe
            element.textContent.includes(containedText) ||
            (element.getAttribute('aria-label') || '').includes(
              // $FlowFixMe
              containedText
            ) ||
            // $FlowFixMe
            (element.value || '').includes(containedText)
        )
      : elements[0]

  if (!element) {
    throw new Error(`Unable to find element`)
  }

  return element
}
