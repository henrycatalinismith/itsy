const chalk = require("chalk")

module.exports = (tool, message) => {
  console.log(`${chalk.cyanBright(`${tool}:`)} ${message}`)
}
