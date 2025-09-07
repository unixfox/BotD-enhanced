import { BotdError, State } from '../types'

export interface HighEntropyValuesPayload {
  architecture: string
  bitness: string
  model: string
  platformVersion: string
  uaFullVersion: string
  userAgent: string
}

export default async function getHighEntropyValues(): Promise<HighEntropyValuesPayload | null> {
  try {
    const navigator = globalThis.navigator as any
    if (!navigator?.userAgentData?.getHighEntropyValues) {
      return null
    }

    const data = await navigator.userAgentData.getHighEntropyValues([
      'architecture',
      'bitness',
      'model',
      'platformVersion',
      'uaFullVersion',
    ])

    return {
      architecture: data.architecture || '',
      bitness: data.bitness || '',
      model: data.model || '',
      platformVersion: data.platformVersion || '',
      uaFullVersion: data.uaFullVersion || '',
      userAgent: navigator.userAgent || '',
    }
  } catch (error) {
    throw new BotdError(State.UnexpectedBehaviour, `Error getting high entropy values: ${error}`)
  }
}
