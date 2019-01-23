/* @flow */
import type { Element, ElementType } from 'react'
import 'jsdom-global/register'
import { render } from 'react-dom'

export default function(
  jsx: Element<ElementType>,
  container: HTMLElement = document.createElement('div')
): HTMLElement {
  render(jsx, container)
  return container
}
