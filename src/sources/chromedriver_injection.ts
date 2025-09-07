import { BotdError, State } from '../types'

export interface ChromeDriverInjectionPayload {
  detected: boolean
  matches: string[]
}

const chromedriverSourceMatches = [
  'WebDriver',
  'W3C',
  'Execute-Script',
  'cdc_adoQpoasnfa76pfcZLmcfl',
  'Chromium',
  'shadow-6066-11e4-a52e-4f735466cecf',
  'element-6066-11e4-a52e-4f735466cecf',
  'STALE_ELEMENT_REFERENCE',
  'crbug.com/40229283',
  'shadow root is detached from the current frame',
  'stale element not found in the current frame',
]

export default function getChromeDriverInjection(): ChromeDriverInjectionPayload {
  try {
    let detected = false
    const matches: string[] = []

    // Hook Function.prototype.apply to detect script injection
    const originalApply = Function.prototype.apply
    let hookInstalled = false

    try {
      Function.prototype.apply = function (thisArg: any, argArray?: any): any {
        const code = this.toString()
        
        for (const testStr of chromedriverSourceMatches) {
          if (code.indexOf(testStr) !== -1 && !matches.includes(testStr)) {
            matches.push(testStr)
            detected = true
          }
        }

        return originalApply.call(this, thisArg, argArray)
      }
      hookInstalled = true

      // Trigger some common automation function calls to detect injection
      try {
        // Try to trigger automation detection by accessing common properties
        // These assignments are intentional to trigger potential hooks
        void document.querySelector
        void document.querySelectorAll
        void HTMLElement.prototype.click
      } catch (e) {
        // Ignore errors during trigger attempts
      }
    } finally {
      if (hookInstalled) {
        Function.prototype.apply = originalApply
      }
    }

    return {
      detected,
      matches,
    }
  } catch (error) {
    throw new BotdError(State.UnexpectedBehaviour, `Error detecting ChromeDriver injection: ${error}`)
  }
}
