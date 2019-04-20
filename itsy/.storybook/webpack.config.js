const path = require("path")

module.exports = async ({ config }) => {
  config.module.rules[0].use[0].options.sourceType = "unambiguous";
  return config
} 