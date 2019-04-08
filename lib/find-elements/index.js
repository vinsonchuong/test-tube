/* @flow */

export default function(
  container: HTMLElement,
  cssSelector: string
): Array<HTMLElement> {
  return Array.from(container.querySelectorAll(cssSelector))
}
