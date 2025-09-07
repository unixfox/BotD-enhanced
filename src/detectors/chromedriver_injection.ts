import { BotKind, ComponentDict, DetectorResponse, State, BrowserEngineKind } from '../types'
import { getBrowserEngineKind } from '../utils/browser'

export function detectChromeDriverInjection({ chromedriverInjection }: ComponentDict): DetectorResponse {
  // Only run on Chromium-based browsers
  if (getBrowserEngineKind() !== BrowserEngineKind.Chromium) {
    return
  }

  if (chromedriverInjection.state !== State.Success) {
    return
  }

  const { detected, matches } = chromedriverInjection.value

  if (detected && matches.length > 0) {
    return BotKind.Selenium
  }
}
