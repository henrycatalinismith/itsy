#!/usr/bin/env node

const fs = require("fs")
const process = require("process")
const express = require("express")
const serveStatic = require("serve-static")

const app = express()
const port = process.env.PORT || "8080"

const filename = process.argv.pop()
if (filename === __filename) {
  // means no code file has been given :(
  process.exit(-1)
}

const code = fs.readFileSync(filename, "utf-8")

app.use(serveStatic(__dirname))

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
  <body>
    <script type="text/lua">${code}</script>
    <script type="text/javascript" src="/client.js"></script>
  </body>
</html>`)
})

app.listen(port, () => {
  console.log(`itsy8 up and running on http://127.0.0.1:${port}/!`)
})

