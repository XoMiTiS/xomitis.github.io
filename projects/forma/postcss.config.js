const platformMedia = () => ({
  postcssPlugin: 'platform-media',

  AtRule: {
    media(atRule) {
      if (atRule.params === '(platform: mobile)') {
        atRule.params = '(max-width: 768px)'
      }

      if (atRule.params === '(platform: tablet)') {
        atRule.params = '(max-width: 1365px)'
      }

      if (atRule.params === '(platform: desktop)') {
        atRule.params = '(min-width: 1366px)'
      }
    },
  },
})

platformMedia.postcss = true

export default {
  plugins: [platformMedia()],
}
