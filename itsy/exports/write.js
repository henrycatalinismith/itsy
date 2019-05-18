const uuid = require("uuid")
const { Buffer } = require("buffer")
const base64 = require("../base64")

exports.write = ({
  id = uuid(),
  name = "",
  created = (new Date).toISOString(),
  updated = (new Date).toISOString(),
  lua = "",
  palette = base64.palette,
  snapshot = base64.snapshot,
  spritesheet = base64.spritesheet,
  width = undefined,
  height = undefined,
}) => `
<!DOCTYPE html>
<html>
<head>
<link href="data:image/x-icon;base64,${base64.favicon}" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
<title>${name}</title>
</head>
<body>
<script id="lua" type="text/lua">
${lua}
</script>
<script id="metadata" type="application/json">
${JSON.stringify({
  id,
  name,
  created,
  updated,
}, undefined, 2)}
</script>
<script id="options" type="application/json">
${JSON.stringify({
  width,
  height,
}, undefined, 2)}
</script>
<img id="palette" width="4" height="4" src="data:image/png;base64,${palette}" />
<img id="snapshot" width="128" height="128" src="data:image/png;base64,${snapshot}" />
<img id="spritesheet" width="128" height="128" src="data:image/png;base64,${spritesheet}" />
<canvas id="canvas" width="128" height="128"></canvas>
<style id="stylesheet" type="text/css">
${Buffer.from(base64.stylesheet, "base64").toString()}
</style>
<script id="itsy" type="text/javascript">
console.log("test")
${Buffer.from(base64.engine, "base64").toString()}
</script>
</body>
</html>
`.trim()

