import { BotdError, State } from '../types'

export interface DevtoolsDetectionPayload {
  devtoolsOpen: boolean
  consoleAccessed: boolean
}

export default function getDevtoolsDetection(): DevtoolsDetectionPayload {
  try {
    let devtoolsOpen = false
    let consoleAccessed = false

    // Method 1: Console debug timing check
    const start = performance.now()
    
    // Check if console.debug accesses internal debugging functions
    let stackLookupCount = 0
    const errorObj = new Error()
    
    Object.defineProperty(errorObj, 'stack', {
      configurable: false,
      enumerable: false,
      get: function() {
        stackLookupCount += 1
        return ''
      }
    })

    try {
      console.debug(errorObj)
    } catch (e) {
      // Ignore errors
    }

    const timeTaken = performance.now() - start

    // DevTools typically causes longer execution times for certain operations
    if (timeTaken > 50 && stackLookupCount > 0) {
      devtoolsOpen = true
    }

    if (stackLookupCount > 0) {
      consoleAccessed = true
    }

    return {
      devtoolsOpen,
      consoleAccessed,
    }
  } catch (error) {
    throw new BotdError(State.UnexpectedBehaviour, `Error detecting devtools: ${error}`)
  }
}
