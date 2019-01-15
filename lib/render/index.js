/* @flow */
import type { Element, ElementType } from 'react'
import 'jsdom-global/register'
import { render } from 'react-dom'

export default function(jsx: Element<ElementType>): HTMLDivElement {
  const container = document.createElement('div')
  render(jsx, container)
  return container
}
