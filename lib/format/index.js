/* @flow */
import pretty from 'pretty'

export default function(container: HTMLElement): string {
  return pretty(container.outerHTML)
}
