const cp = require("child_process")
const fs = require("fs")
const log = require("./log")
const rel = require("./rel")

const name = rel("package.json")
const json = fs.readFileSync(name, "utf-8")

const pkg = JSON.parse(json)
const { version } = pkg

log("tag", `extracted ${name}`)
log("tag", `tagging ${version}`)

cp.execSync(`git tag "${version}"`, {
  cwd: `${__dirname}/../`,
  stdio: "inherit",
})

console.log()



