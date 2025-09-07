import { BotKind, ComponentDict, DetectorResponse, State, BrowserEngineKind } from '../types'
import { getBrowserEngineKind } from '../utils/browser'

export function detectHighEntropyValues({ highEntropyValues }: ComponentDict): DetectorResponse {
  // Only run on Chromium-based browsers
  if (getBrowserEngineKind() !== BrowserEngineKind.Chromium) {
    return
  }

  if (highEntropyValues.state !== State.Success || !highEntropyValues.value) {
    return
  }

  const data = highEntropyValues.value

  // Check if all high entropy values are empty (signs of UA override/automation)
  if (
    data.architecture === '' &&
    data.model === '' &&
    data.platformVersion === '' &&
    data.uaFullVersion === '' &&
    data.bitness === ''
  ) {
    return BotKind.HeadlessChrome
  }
}
