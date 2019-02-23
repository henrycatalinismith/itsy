module.exports = n => {
  return require("path").relative(
    require("process").cwd(),
    `${__dirname}/../${n}`
  )
}
