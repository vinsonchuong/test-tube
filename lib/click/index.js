import {Simulate, act} from 'react-dom/test-utils'
import {findElement} from '../../index.js'

export default function (container, containedText) {
  act(() => {
    const clickable = findElement(
      container,
      [
        'a',
        'button:not([disabled])',
        '[role="button"]',
        '[role="link"]',
        '[role="menuitem"]',
        '[role="option"]',
        'input[type="button"]:not([disabled])',
        'input[type="submit"]:not([disabled])',
      ].join(','),
      containedText,
    )

    Simulate.click(clickable, {button: 0})

    if (
      clickable.type === 'submit' &&
      clickable.form instanceof window.HTMLFormElement
    ) {
      Simulate.submit(clickable.form)
    }
  })
}
