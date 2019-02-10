#!/usr/bin/env node

const http = require("http")
const host = "127.0.0.1"
const port = process.env.PORT || "8080"

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello World\n")
})

server.listen(port, host, () => {
  console.log(`itsy8 up and running on http://${host}:${port}/!`)
})

