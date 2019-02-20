/* @flow */
import { Simulate, act } from 'react-dom/test-utils'
import { findElement } from 'test-tube'

export default function(container: HTMLElement, containedText: string): void {
  act(() => {
    const clickable = findElement(
      container,
      'a, button, [role="button"], [role="link"], input[type="button"]',
      containedText
    )

    Simulate.click(clickable)
  })
}
