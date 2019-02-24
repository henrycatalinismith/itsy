const log = require("./log")
const make = require("./make")
const watch = require("./watch")

log("start", "building itsy.js")
make("clean itsy")

watch("engine/itsy.c", () => make("clean itsy"))
require(`${__dirname}/../server.js`)

