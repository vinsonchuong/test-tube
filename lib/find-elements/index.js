export default function (container, cssSelector) {
  return Array.from(container.querySelectorAll(cssSelector))
}
