/* @flow */
import { Simulate } from 'react-dom/test-utils'

export default function(container: HTMLElement, containedText: string): void {
  const clickable =
    Array.from(
      container.querySelectorAll('a, button, [role="button"], [role="link"]')
    ).find(element => element.textContent.includes(containedText)) ||
    Array.from(container.querySelectorAll('input[type="button"]')).find(
      /* $FlowFixMe */
      element => element.value.includes(containedText)
    )

  if (!clickable) {
    throw new Error('Unable to find clickable element')
  }

  Simulate.click(clickable)
}
