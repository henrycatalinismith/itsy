const fs = require("fs")
const log = require("./log")
const rel = require("./rel")

const name = rel("package.json")
const json = fs.readFileSync(name, "utf-8")

const pkg = JSON.parse(json)
const { version } = pkg
const [ major, minor, patch ] = version.split(/\./)

const newVersion = [
  major,
  parseInt(minor, 10) + 1,
  0,
].join(".")

pkg.version = newVersion

const output = JSON.stringify(pkg, undefined, 2)

log('bump', `bumping ${name}`)
log('bump', `old version: ${version}`)
log('bump', `new version: ${newVersion}`)

fs.writeFileSync(name, output)

console.log()


