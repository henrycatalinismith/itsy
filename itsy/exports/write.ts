import uuid from "uuid"
import { Buffer } from "buffer"
import base64 from "../base64"
import { PartialDisk } from "@itsy.studio/types"

export default function write({
  id = uuid(),
  name = "",
  lua = "",
  palette = base64.palette,
  snapshot = base64.snapshot,
  spritesheet = base64.spritesheet,
  created = new Date().toISOString(),
  updated = created,
}: PartialDisk): string {
  return `
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
${JSON.stringify(
  {
    id,
    name,
    created,
    updated,
  },
  undefined,
  2
)}
</script>
<script id="options" type="application/json">
${JSON.stringify(
  {
    width: undefined,
    height: undefined,
  },
  undefined,
  2
)}
</script>
<img id="palette" width="4" height="4" src="data:image/png;base64,${palette}" />
<img id="snapshot" width="128" height="128" src="data:image/png;base64,${snapshot}" />
<img id="spritesheet" width="128" height="128" src="data:image/png;base64,${spritesheet}" />
<canvas id="canvas" width="128" height="128"></canvas>
<style id="stylesheet" type="text/css">
${Buffer.from(base64.stylesheet, "base64").toString()}
</style>
<script id="itsy" type="text/javascript">
if (typeof window.ReactNativeWebView !== "undefined") {
  window.buffer = ""

  setInterval(() => {
    if (window.buffer.length > 0) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "console.log",
        payload: buffer,
      }));
      window.buffer = ""
    }
  }, 100)

  window.console.log = l => {
    window.buffer += l + "\\n"
  };
}

document.addEventListener("DOMContentLoaded", () => {
  //for (let i = 0; i < 32; i++) {
    //console.log("lol" + i)
  //}

  const ids = [
    "canvas",
    "lua",
    "metadata",
    "options",
    "palette",
    "spritesheet",
  ]

  const elements = ids.reduce((object, id) => ({
    ...object,
    [id]: document.querySelector(\`#\${id}\`),
  }), {})

  const canvas = elements.canvas
  const lua = elements.lua.innerText
  const metadata = JSON.parse(elements.metadata.innerText)
  const options = JSON.parse(elements.options.innerText)
  const palette = elements.palette.src.split(",")[1]
  const spritesheet = elements.spritesheet.src.split(",")[1]

  console.log(options)

  const width = options.width || window.innerWidth
  const height = options.height || window.innerHeight

  canvas.style.width = \`\${width}px\`
  canvas.style.height = \`\${height}px\`
  canvas.width = width
  canvas.height = height
  // canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight)
  // canvas.width = 128
  // canvas.height = 128

  const argv = [
    lua,
    palette,
    spritesheet,
    \`\${canvas.width}\`,
    \`\${canvas.height}\`,
  ]

  var itsy = {
    arguments: argv,
    canvas,
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  }
  window.itsy = itsy

  ${Buffer.from(base64.engine, "base64").toString()}

})
</script>
</body>
</html>
`.trim()
}
