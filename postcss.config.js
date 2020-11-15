const postcssPresetEnv = require(`postcss-preset-env`)
const postcssNormalize = require("postcss-normalize")
module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      preserve: false,
      importFrom: "./src/common/theme.css",
    }),
    postcssNormalize(),
  ],
})
