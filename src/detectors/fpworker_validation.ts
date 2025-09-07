import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectFpWorkerValidation({ fpworkerValidation }: ComponentDict): DetectorResponse {
  if (fpworkerValidation.state !== State.Success || !fpworkerValidation.value) {
    return
  }

  const data = fpworkerValidation.value

  // If we have both window and service worker data, compare them
  if (data.serviceWorker) {
    const windowScope = data.windowScope
    const serviceWorker = data.serviceWorker

    // If any fingerprint property differs between window and service worker, it's a bot
    // This follows your requirement: "if there is a diff it's an unknown bot"
    if (windowScope.engine !== serviceWorker.engine ||
        windowScope.timeZone !== serviceWorker.timeZone ||
        windowScope.userAgent !== serviceWorker.userAgent ||
        windowScope.language !== serviceWorker.language) {
      return BotKind.Unknown
    }
  }
}
