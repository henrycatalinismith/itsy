const cp = require("child_process")
const fs = require("fs")
const log = require("./log")

const name = `${__dirname}/../package.json`
const json = fs.readFileSync(name, "utf-8")

const pkg = JSON.parse(json)
const { version } = pkg

log("tag", version)

cp.execSync(`git tag "${version}"`, {
  cwd: `${__dirname}/../`,
  stdio: "inherit",
})

console.log()



