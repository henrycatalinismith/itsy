const log = require("./log")
const make = require("./make")
const watch = require("./watch")

log("start", "building itsy.js")
make("clean itsy.js")

watch("itsy.c", () => make("clean itsy.js"))
require(`${__dirname}/../server.js`)

