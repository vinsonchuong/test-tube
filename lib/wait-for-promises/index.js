import {promisify} from 'node:util'
import {act} from 'react-dom/test-utils'

const sleep = promisify(setTimeout)

export default async function () {
  await act(async () => {
    await sleep(0)
  })
}
