/* @flow */
import { promisify } from 'util'

const sleep = promisify(setTimeout)

export default async function(): Promise<void> {
  await sleep(0)
}
