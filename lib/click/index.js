/* @flow */
import { Simulate, act } from 'react-dom/test-utils'
import { findElement } from 'test-tube'

export default function(container: HTMLElement, containedText: string): void {
  act(() => {
    const clickable = findElement(
      container,
      'a, button, [role="button"], [role="link"], input[type="button"], input[type="submit"]',
      containedText
    )

    Simulate.click(clickable)

    if (
      // $FlowFixMe
      clickable.type === 'submit' &&
      // $FlowFixMe
      clickable.form instanceof window.HTMLFormElement
    ) {
      Simulate.submit(clickable.form)
    }
  })
}
