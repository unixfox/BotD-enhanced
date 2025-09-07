import { BotKind, ComponentDict, DetectorResponse, State, BrowserEngineKind } from '../types'
import { getBrowserEngineKind } from '../utils/browser'

export function detectDevtools({ devtoolsDetection }: ComponentDict): DetectorResponse {
  // Only run on Chromium-based browsers
  if (getBrowserEngineKind() !== BrowserEngineKind.Chromium) {
    return
  }

  if (devtoolsDetection.state !== State.Success) {
    return
  }

  const { devtoolsOpen, consoleAccessed } = devtoolsDetection.value

  // DevTools open could indicate automation or debugging tools
  if (devtoolsOpen && consoleAccessed) {
    return BotKind.HeadlessChrome
  }
}
