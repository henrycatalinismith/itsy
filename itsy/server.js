#!/usr/bin/env node

const fs = require("fs")
const process = require("process")
const fetch = require("node-fetch")
const express = require("express")
const serveStatic = require("serve-static")

const img = sprite => [
  `<img data-name="${sprite.name}" src="${sprite.dataUrl}" />`
]

async function main() {
  const cwd = process.cwd()
  const assetsPath = `${cwd}/.glitch-assets`
  const sprites = []

  if (fs.existsSync(assetsPath)) {
    fs
      .readFileSync(assetsPath, "utf-8")
      .split(/\n/)
      .filter(b => !!b)
      .map(json => JSON.parse(json))
      .filter(asset => !asset.deleted)
      .filter(asset => !!asset.name.match(/\.png$/))
      .forEach(sprite => sprites.push(sprite))
  }

  console.log(sprites)

  for (const sprite of sprites) {
    const response = await fetch(sprite.url)
    const buffer = await response.arrayBuffer()
    const dataUrl = Buffer.from(buffer, "binary").toString('base64')
    sprite.dataUrl = `data:image/png;base64,${dataUrl}`
  }

  const js = fs.readFileSync(`${__dirname}/client.js`, "utf-8")
  const css = fs.readFileSync(`${__dirname}/style.css`, "utf-8")

  const pkg = JSON.parse(fs.readFileSync(`${__dirname}/package.json`))
  const json = JSON.stringify({
    version: pkg.version,
  }, undefined, 2)

  const app = express()
  const port = process.env.PORT || "8080"

  const filename = process.argv.pop()
  if (filename === __filename) {
    // means no code file has been given :(
    process.exit(-1)
  }

  const code = fs.readFileSync(filename, "utf-8")

  app.use(serveStatic(__dirname))

  app.get("/", (req, res) => res.send(`<!DOCTYPE html>
<html>
<body>
<script type="application/json">
${json}
</script>
<script type="text/lua">
${code.trimEnd()}
</script>
<script type="text/javascript">
${js.trim()}
</script>
<style type="text/css">
${css.trim()}
</style>
<img width="8" height="8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAa0lEQVQoU2NkYGD4L6sdzJD4h4Fhf+I/hsMV6xkZkADj6iCz/1tYJRmScyoYrPUUGZj5JVAVvPXw/s8R/YyBI4SZoeSTCkO/+ApUBVZrf//3PLmQIfsfNwN3BDMDu0kYqgJk+7CxUVTTRgEAxuwaCSbl+0MAAAAASUVORK5CYII=" />
<img width="128" height="128" src="${sprites[0].dataUrl}" />
</body>
</html>`))

  app.listen(port, () => {
    console.log(`itsy up and running on http://127.0.0.1:${port}/!`)
  })
}

main()
