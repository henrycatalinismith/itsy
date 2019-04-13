const log = require("./log")
const make = require("./make")
const watch = require("./watch")

log("start", "building itsy.js")

require(`${__dirname}/../commands/start.js`)

