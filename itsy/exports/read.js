const { parse } = require("himalaya")

const read = html => {
  const [,, { children: document }] = parse(html)
  const [,,, { children: body }] = document

  console.log(body)

  const lua = body
    .filter(e => e.tagName === "script")
    .filter(e => e.attributes[0].key === "type")
    .filter(e => e.attributes[0].value === "text/lua")
    .pop()
    .children
    .pop()
    .content

  const palette = body
    .filter(e => e.tagName === "img")
    .filter(e => e.attributes[0].key === "width")
    .filter(e => e.attributes[0].value === "4")
    .filter(e => e.attributes[1].key === "height")
    .filter(e => e.attributes[1].value === "4")
    .pop()
    .attributes
    .pop()
    .value
    .split(/,/)
    .pop()

  const spritesheet = body
    .filter(e => e.tagName === "img")
    .filter(e => e.attributes[0].key === "width")
    .filter(e => e.attributes[0].value === "128")
    .filter(e => e.attributes[1].key === "height")
    .filter(e => e.attributes[1].value === "128")
    .pop()
    .attributes
    .pop()
    .value
    .split(/,/)
    .pop()

  return {
    lua,
    palette,
    spritesheet,
  }
}