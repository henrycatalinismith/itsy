module.exports = command => require("child_process").execSync(
  `git ${command}`, {
    cwd: `${__dirname}/../`,
    stdio: "inherit",
  }
)
