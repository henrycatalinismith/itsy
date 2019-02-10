#!/usr/bin/env node

const express = require("express")
const serveStatic = require("serve-static")

const app = express()
const port = process.env.PORT || "8080"

app.use(serveStatic(__dirname))

app.listen(port, () => {
  console.log(`itsy8 up and running on http://127.0.0.1:${port}/!`)
})

