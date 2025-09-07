import getFpWorkerValidation from './fpworker_validation'

describe('Sources', () => {
  describe('fpworkerValidation', () => {
    it('should return valid fpworker validation data', async () => {
      const result = await getFpWorkerValidation()
      
      expect(result).toBeDefined()
      expect(typeof result.windowScope).toBe('object')
      expect(typeof result.windowScope.timeZone).toBe('string')
      expect(typeof result.windowScope.language).toBe('string')
      expect(typeof result.windowScope.userAgent).toBe('string')
      expect(typeof result.windowScope.engine).toBe('string')
      expect(typeof result.isServiceWorkerSupported).toBe('boolean')
      expect(typeof result.isSharedWorkerSupported).toBe('boolean')
      expect(typeof result.executionTime).toBe('number')
      
      // serviceWorker can be null if not supported or failed
      if (result.serviceWorker) {
        expect(typeof result.serviceWorker.timeZone).toBe('string')
        expect(typeof result.serviceWorker.language).toBe('string')
        expect(typeof result.serviceWorker.userAgent).toBe('string')
        expect(typeof result.serviceWorker.engine).toBe('string')
      }
    })

    it('should have reasonable execution time', async () => {
      const result = await getFpWorkerValidation()
      expect(result.executionTime).toBeGreaterThanOrEqual(0)
      expect(result.executionTime).toBeLessThan(10000) // Less than 10 seconds
    })
  })
})
