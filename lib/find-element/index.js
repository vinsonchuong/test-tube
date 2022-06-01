import {findElements} from '../../index.js'

export default function (container, cssSelector, containedText) {
  const elements = findElements(container, cssSelector)

  const element =
    typeof containedText === 'string'
      ? elements.find(
          (element) =>
            element.textContent.includes(containedText) ||
            (element.getAttribute('aria-label') || '').includes(
              containedText,
            ) ||
            (element.value || '').includes(containedText),
        )
      : elements[0]

  if (!element) {
    throw new Error(`Unable to find element`)
  }

  return element
}
