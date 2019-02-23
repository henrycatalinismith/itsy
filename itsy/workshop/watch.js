const fs = require("fs")
const log = require("./log")
const rel = require("./rel")

module.exports = (name, cb) => {
  log("watch", `watching ${rel(name)}`)
  fs.watchFile(rel(name), { interval: 1000 }, () => {
    log("watch", `${rel(name)} changed`)
    cb()
  })
}
