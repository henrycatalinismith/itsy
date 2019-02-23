module.exports = (tool, message) => {
  console.log(`${require("chalk").cyanBright(`${tool}:`)} ${message}`)
}
