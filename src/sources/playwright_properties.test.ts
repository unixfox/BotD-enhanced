import getPlaywrightProperties from './playwright_properties'

describe('Sources', () => {
  describe('playwrightProperties', () => {
    it('returns playwright properties detection', () => {
      const result = getPlaywrightProperties()
      expect(typeof result.pwInitScripts).toBe('boolean')
      expect(typeof result.playwrightBinding).toBe('boolean')
    })
  })
})
