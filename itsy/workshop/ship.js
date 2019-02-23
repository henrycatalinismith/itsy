const git = require("./git")
const log = require("./log")
const make = require("./make")
const npm = require("./npm")

const [,, ...words] = process.argv
const message = words.join(" ")

npm("run bump")
make("clean itsy.js")
git(`commit -am "${message}"`)
npm("run tag")
git("push highvalley master --tags")
npm("publish")

console.log()

