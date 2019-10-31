/* @flow */
import { act } from 'react-dom/test-utils'
import { unmountComponentAtNode } from 'react-dom'

export default function(container: HTMLElement): void {
  act(() => {
    unmountComponentAtNode(container)
  })
}
