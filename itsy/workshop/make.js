module.exports = command => require("child_process").execSync(
  `make ${command}`, {
    cwd: `${__dirname}/../`,
    stdio: "inherit",
  }
)

