import {findElement} from '../../index.js'

export default function (container, labelText) {
  const label = findElement(container, 'label', labelText)

  if (!(label instanceof window.HTMLLabelElement)) {
    throw new TypeError('Unable to find label with given text')
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
