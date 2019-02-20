/* @flow */
import type { Element, ElementType } from 'react'
import register from 'jsdom-global'
import { render } from 'react-dom'

register('<!doctype html><meta charset="utf-8">', { url: 'http://localhost' })

export default function(
  jsx: Element<ElementType>,
  container: HTMLElement = document.createElement('div')
): HTMLElement {
  render(jsx, container)
  return container
}
