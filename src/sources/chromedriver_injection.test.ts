import getChromeDriverInjection from './chromedriver_injection'

describe('Sources', () => {
  describe('chromedriverInjection', () => {
    it('returns chromedriver injection detection', () => {
      const result = getChromeDriverInjection()
      expect(typeof result.detected).toBe('boolean')
      expect(Array.isArray(result.matches)).toBeTrue()
    })
  })
})
