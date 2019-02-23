#!/usr/bin/env node

const fs = require("fs")
const process = require("process")
const util = require("util")

const fetch = require("node-fetch")
const express = require("express")
const serveStatic = require("serve-static")

const read = util.promisify(fs.readFile)

async function main() {
  const cwd = process.cwd()
  const assetsPath = `${cwd}/.glitch-assets`
  const sprites = []

  const palette = Buffer.from(
    fs.readFileSync(`${__dirname}/palette.png`)
  ).toString("base64")

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

  sprites.splice(0, sprites.length - 1)

  for (const sprite of sprites) {
    const response = await fetch(sprite.url)
    const buffer = await response.arrayBuffer()
    const dataUrl = Buffer.from(buffer, "binary").toString('base64')
    sprite.dataUrl = `data:image/png;base64,${dataUrl}`
  }

  const css = fs.readFileSync(`${__dirname}/style.css`, "utf-8")

  const pkg = JSON.parse(fs.readFileSync(`${__dirname}/package.json`))
  const json = JSON.stringify({
    version: pkg.version,
  }, undefined, 2)

  const app = express()
  const port = process.env.PORT || "8080"

  let filename = process.argv.pop()
  if (filename === __filename || !filename.match(/\.lua$/)) {
    filename = `${process.cwd()}/itsy.lua`
  }

  if (!fs.existsSync(filename)) {
    console.error(`itsy: no code @ ${filename}`)
    process.exit(-1)
  }

  app.get("/favicon.ico", (req, res) => {
    res.setHeader("content-type", "image/vnd.microsoft.icon")
    fs.createReadStream(`${__dirname}/favicon.ico`).pipe(res)
  })

  app.get(`/itsy-${pkg.version}.js`, (req, res) => {
    res.setHeader("content-type", "text/javascript")
    fs.createReadStream(`${__dirname}/itsy.js`).pipe(res)
  })

  app.get(`/itsy-${pkg.version}.wasm`, (req, res) => {
    res.setHeader("content-type", "application/wasm")
    fs.createReadStream(`${__dirname}/itsy.wasm`).pipe(res)
  })

  app.get("/", async (req, res) => {
    const lua = await read(filename, "utf-8")
    const js = await read(`${__dirname}/client.js`, "utf-8")

    res.send(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
</head>
<body>
<script type="application/json">
${json}
</script>
<script type="text/lua">
${lua.trimEnd()}
</script>
<img width="8" height="8" src="data:image/png;base64,${palette}" />
<img width="128" height="128" src="${sprites[0].dataUrl}" />
<canvas width="128" height="128"></canvas>
<script type="text/javascript">
${js.trim()}
</script>
<style type="text/css">
${css.trim()}
</style>
</body>
</html>`)

  })


  app.listen(port, () => {
    console.log(`itsy up and running on http://127.0.0.1:${port}/!`)
  })
}


main()

