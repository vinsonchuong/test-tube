/* @flow */
import { Simulate } from 'react-dom/test-utils'
import cssToXPath from 'css-to-xpath'

export default function(
  container: HTMLElement,
  labelText: string,
  value: string
): void {
  const xpath = cssToXPath
    .parse('label')
    .where(cssToXPath.xPathBuilder.text().contains(labelText))
    .toXPath()

  const label = window.document.evaluate(
    xpath,
    container,
    null,
    window.XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue

  label.control.value = value
  Simulate.change(label.control)
}
