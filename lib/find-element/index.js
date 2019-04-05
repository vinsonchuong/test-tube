/* @flow */

export default function(
  container: HTMLElement,
  cssSelector: string,
  containedText: ?string
): HTMLElement {
  const elements = container.querySelectorAll(cssSelector)

  const element =
    typeof containedText === 'string'
      ? Array.from(elements).find(
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
