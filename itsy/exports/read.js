const cheerio = require("cheerio")

const read = html => {
  const $ = cheerio.load(html)
  const { id, name, created, updated } = JSON.parse($("#metadata").html())
  const lua = $("#lua").html()
  const palette = $("#palette").attr("src").split(",")[1]
  const snapshot = $("#snapshot").attr("src").split(",")[1]
  const spritesheet = $("#spritesheet").attr("src").split(",")[1]

  return {
    id,
    name,
    created,
    updated,
    lua,
    palette,
    snapshot,
    spritesheet,
  }
}

module.exports = read