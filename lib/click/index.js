/* @flow */
import { Simulate } from 'react-dom/test-utils'
import cssToXPath from 'css-to-xpath'

export default function(container: HTMLElement, containedText: string): void {
  const xpath = cssToXPath
    .parse('a, button, input[type="button"], [role="button"], [role="link"]')
    .where(cssToXPath.xPathBuilder.text().contains(containedText))
    .toXPath()

  const clickable = window.document.evaluate(
    xpath,
    container,
    null,
    window.XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue

  Simulate.click(clickable)
}
