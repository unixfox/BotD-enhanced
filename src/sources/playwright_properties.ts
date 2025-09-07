import { BotdError, State } from '../types'

export interface PlaywrightPropertiesPayload {
  pwInitScripts: boolean
  playwrightBinding: boolean
}

export default function getPlaywrightProperties(): PlaywrightPropertiesPayload {
  try {
    const global = globalThis as any
    return {
      pwInitScripts: '__pwInitScripts' in global && global.__pwInitScripts !== undefined,
      playwrightBinding: '__playwright__binding__' in global && global.__playwright__binding__ !== undefined,
    }
  } catch (error) {
    throw new BotdError(State.UnexpectedBehaviour, `Error checking playwright properties: ${error}`)
  }
}
