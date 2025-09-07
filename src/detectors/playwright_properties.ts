import { BotKind, ComponentDict, DetectorResponse, State, BrowserEngineKind } from '../types'
import { getBrowserEngineKind } from '../utils/browser'

export function detectPlaywright({ playwrightProperties }: ComponentDict): DetectorResponse {
  // Only run on Chromium-based browsers
  if (getBrowserEngineKind() !== BrowserEngineKind.Chromium) {
    return
  }

  if (playwrightProperties.state !== State.Success) {
    return
  }

  const { pwInitScripts, playwrightBinding } = playwrightProperties.value

  if (pwInitScripts || playwrightBinding) {
    return BotKind.Playwright
  }
}
