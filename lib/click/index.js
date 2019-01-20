/* @flow */
import { Simulate } from 'react-dom/test-utils'
import cssToXPath from 'css-to-xpath'

export default function(container: HTMLElement, containedText: string): void {
  const xpath = cssToXPath
    .parse('a')
    .where(cssToXPath.xPathBuilder.text().contains(containedText))
    .union(
      cssToXPath
        .parse('button')
        .where(cssToXPath.xPathBuilder.text().contains(containedText))
    )
    .union(
      cssToXPath
        .parse('[role="button"]')
        .where(cssToXPath.xPathBuilder.text().contains(containedText))
    )
    .union(
      cssToXPath
        .parse('[role="link"]')
        .where(cssToXPath.xPathBuilder.text().contains(containedText))
    )
    .union(
      cssToXPath
        .parse('input[type="button"]')
        .where(cssToXPath.xPathBuilder.attr('value').contains(containedText))
    )
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
