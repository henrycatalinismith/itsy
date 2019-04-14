module.exports = (tool, message) => {
  console.log(`${require("ansi-colors").cyanBright(`${tool}:`)} ${message}`)
}
