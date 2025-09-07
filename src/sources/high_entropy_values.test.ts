import getHighEntropyValues from './high_entropy_values'

describe('Sources', () => {
  describe('highEntropyValues', () => {
    it('returns high entropy values or null', async () => {
      const result = await getHighEntropyValues()
      
      if (result === null) {
        // API not available (non-Chromium or old version)
        expect(result).toBeNull()
      } else {
        expect(typeof result.architecture).toBe('string')
        expect(typeof result.bitness).toBe('string')
        expect(typeof result.model).toBe('string')
        expect(typeof result.platformVersion).toBe('string')
        expect(typeof result.uaFullVersion).toBe('string')
        expect(typeof result.userAgent).toBe('string')
      }
    })
  })
})
