import getDevtoolsDetection from './devtools_detection'

describe('Sources', () => {
  describe('devtoolsDetection', () => {
    it('returns devtools detection', () => {
      const result = getDevtoolsDetection()
      expect(typeof result.devtoolsOpen).toBe('boolean')
      expect(typeof result.consoleAccessed).toBe('boolean')
    })
  })
})
