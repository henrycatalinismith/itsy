const { Buffer } = require("buffer")
const base64 = require("../base64")

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

module.exports = write
