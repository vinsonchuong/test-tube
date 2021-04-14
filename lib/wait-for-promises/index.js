import {promisify} from 'util'

const sleep = promisify(setTimeout)

export default async function () {
  await sleep(0)
}
