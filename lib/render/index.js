/* @flow */
import type { Element, ElementType } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

export default function(
  jsx: Element<ElementType>,
  container: HTMLElement = document.createElement('div')
): HTMLElement {
  act(() => {
    render(jsx, container)
  })
  return container
}
