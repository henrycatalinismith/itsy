module.exports = command => require("child_process").execSync(
  `npm ${command}`, {
    cwd: `${__dirname}/../`,
    stdio: "inherit",
  }
)

