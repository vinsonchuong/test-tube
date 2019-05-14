/* @flow */
import ms from 'ms'

export default function(
  container: HTMLElement,
  timeout: number = 5000
): Promise<void> {
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    function checkTime() {
      if (Date.now() - startTime > timeout) {
        reject(new Error(`No re-render detected after ${ms(timeout)}`))
      } else {
        setImmediate(checkTime)
      }
    }
    setImmediate(checkTime)

    const observer = new window.MutationObserver(() => {
      resolve()
    })

    observer.observe(container, {
      childList: true,
      characterData: true,
      subtree: true
    })
  })
}
