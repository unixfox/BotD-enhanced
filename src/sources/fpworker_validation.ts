import { BotdError, State } from '../types'

export interface FpWorkerValidationPayload {
  windowScope: {
    timeZone: string
    language: string
    userAgent: string
    engine: string
  }
  serviceWorker: {
    timeZone: string
    language: string
    userAgent: string
    engine: string
  } | null
  isServiceWorkerSupported: boolean
  isSharedWorkerSupported: boolean
  executionTime: number
}

/**
 * Gets the browser engine based on mathematical computation
 * This uses floating point precision differences between browser engines
 */
function getEngine(): string {
  const mathPI = 3.141592653589793
  const result = mathPI ** -100
  const resultStr = result.toString()
  
  // Different browser engines have slightly different floating point precision
  const hashMap: Record<string, string> = {
    '1.9275814160560204e-50': 'Blink',     // Chrome/Chromium (older versions)
    '1.9275814160560185e-50': 'Gecko',     // Firefox
    '1.9275814160560206e-50': 'WebKit',    // Safari / Chrome newer versions
  }
  
  const detected = hashMap[resultStr]
  
  // For Chrome/Chromium browsers, we might get WebKit result due to precision changes
  // Use additional checks to distinguish between Safari WebKit and Chrome Blink
  if (detected === 'WebKit' && typeof window !== 'undefined') {
    // Check for Chrome-specific features to distinguish from Safari
    const isChrome = 'chrome' in window || navigator.userAgent.includes('Chrome')
    if (isChrome) {
      return 'Blink'
    }
  }
  
  return detected || 'unknown'
}

/**
 * Gets fingerprint data for a given scope
 */
function getFingerprint() {
  const ask = <T>(fn: () => T): T | undefined => {
    try {
      return fn()
    } catch (e) {
      return undefined
    }
  }

  return {
    timeZone: ask(() => Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
    language: navigator.language || '',
    userAgent: navigator.userAgent || '',
    engine: getEngine(),
  }
}

/**
 * Gets service worker fingerprint data
 */
function getServiceWorker(): Promise<FpWorkerValidationPayload['serviceWorker']> {
  return new Promise((resolve) => {
    // Check for service worker support
    if (!('serviceWorker' in navigator)) {
      resolve(null)
      return
    }

    // Check if we're in a secure context (required for service workers)
    if (!window.isSecureContext) {
      resolve(null)
      return
    }

    let resolved = false
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true
        resolve(null)
      }
    }, 2000)

    const tryRegisterServiceWorker = async () => {
      // Try multiple possible service worker paths
      const possiblePaths = [
        './fpworker-sw.js',          // Webpack copied file (playground)
        '/fpworker-sw.js',           // Root level (production)
        '/dist/fpworker-sw.js',      // Dist folder
        './dist/fpworker-sw.js',     // Relative dist folder
        '../dist/fpworker-sw.js',    // Parent dist folder
        '/src/fpworker-sw.js',       // In src directory
        './src/fpworker-sw.js'       // Relative src directory
      ]
      
      for (const serviceWorkerPath of possiblePaths) {
        if (resolved) break
        
        try {
          const scope = `/botd-sw-${Date.now()}-${Math.random().toString(36).substr(2, 5)}/`
          
          const registration = await navigator.serviceWorker.register(serviceWorkerPath, { scope })
          
          const cleanup = () => {
            registration.unregister().catch(() => {})
          }

          const tryGetData = (worker: ServiceWorker) => {
            if (resolved) return

            const channel = new MessageChannel()
            
            channel.port1.onmessage = (event) => {
              if (!resolved) {
                resolved = true
                clearTimeout(timeoutId)
                cleanup()
                resolve(event.data)
              }
            }

            try {
              worker.postMessage('getFingerprint', [channel.port2])
              
              // Add a fallback timeout for this specific message
              setTimeout(() => {
                if (!resolved) {
                  resolved = true
                  clearTimeout(timeoutId)
                  cleanup()
                  resolve(null)
                }
              }, 1000)
            } catch (e) {
              if (!resolved) {
                resolved = true
                clearTimeout(timeoutId)
                cleanup()
                resolve(null)
              }
            }
          }

          // Wait for the service worker to be installed and activated
          const waitForWorker = () => {
            return new Promise<ServiceWorker | null>((workerResolve) => {
              if (registration.active) {
                workerResolve(registration.active)
                return
              }
              
              if (registration.installing) {
                registration.installing.addEventListener('statechange', function onStateChange() {
                  if (this.state === 'activated') {
                    this.removeEventListener('statechange', onStateChange)
                    workerResolve(registration.active)
                  } else if (this.state === 'redundant') {
                    this.removeEventListener('statechange', onStateChange)
                    workerResolve(null)
                  }
                })
              } else {
                workerResolve(null)
              }
            })
          }
          
          const worker = await waitForWorker()
          
          if (worker) {
            tryGetData(worker)
          } else {
            if (!resolved) {
              resolved = true
              clearTimeout(timeoutId)
              cleanup()
              resolve(null)
            }
          }
          
          return // Exit the function if registration was successful
          
        } catch (pathError) {
          // Try next path
          continue
        }
      }
      
      // If no path worked, resolve with null
      if (!resolved) {
        resolved = true
        clearTimeout(timeoutId)
        resolve(null)
      }
    }

    tryRegisterServiceWorker().catch(() => {
      if (!resolved) {
        resolved = true
        clearTimeout(timeoutId)
        resolve(null)
      }
    })
  })
}

export default async function getFpWorkerValidation(): Promise<FpWorkerValidationPayload> {
  try {
    const start = performance.now()
    
    // Check for service worker and shared worker support
    const isServiceWorkerSupported = 'serviceWorker' in navigator
    const isSharedWorkerSupported = 'SharedWorker' in window

    // Get fingerprints from both scopes
    const [windowScope, serviceWorker] = await Promise.all([
      Promise.resolve(getFingerprint()),
      getServiceWorker(),
    ])

    const executionTime = performance.now() - start

    return {
      windowScope,
      serviceWorker,
      isServiceWorkerSupported,
      isSharedWorkerSupported,
      executionTime,
    }
  } catch (error) {
    throw new BotdError(State.UnexpectedBehaviour, `Error in fpworker validation: ${error}`)
  }
}
