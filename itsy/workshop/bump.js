const fs = require("fs")
const chalk = require("chalk")

const log = message => {
  console.log(`${chalk.cyanBright('bump:')} ${message}`)
}

const name = `${__dirname}/../package.json`
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

log(`current version: ${version}`)
log(`new version: ${newVersion}`)

fs.writeFileSync(name, output)

console.log()


