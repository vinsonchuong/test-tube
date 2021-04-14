import pretty from 'pretty'

export default function (container) {
  return pretty(container.outerHTML)
}
