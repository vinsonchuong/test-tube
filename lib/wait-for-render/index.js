import ms from 'ms'

export default function (container, timeout = 5000) {
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
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    })
  })
}
