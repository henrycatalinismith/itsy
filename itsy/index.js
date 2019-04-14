const { parse } = require("himalaya")
const { Buffer } = require("buffer")
const base64 = require("./base64")

const write = ({
  lua = '',
  palette = base64.palette,
  spritesheet = base64.spritesheet
}) => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
</head>
<body>
<script type="text/lua">
${lua}
</script>
<img width="4" height="4" src="data:image/png;base64,${palette}" />
<img width="128" height="128" src="data:image/png;base64,${spritesheet}" />
<canvas width="128" height="128"></canvas>
<style type="text/css">
${Buffer.from(base64.stylesheet, "base64").toString()}
</style>
<script type="text/javascript">
${Buffer.from(base64.engine, "base64").toString()}
</script>
</body>
</html>
`.trim()

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

module.exports = {
  read,
  write,
}
