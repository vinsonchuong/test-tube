import ms from 'ms'

export default async function (container, timeout = 5000) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = false

  const startTime = Date.now()

  await new Promise((resolve, reject) => {
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
      subtree: true,
    })
  })

  globalThis.IS_REACT_ACT_ENVIRONMENT = true
}
