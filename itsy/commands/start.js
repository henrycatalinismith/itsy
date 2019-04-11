#!/usr/bin/env node

const fs = require("fs")
const process = require("process")
const util = require("util")

const chalk = require("chalk")
const express = require("express")
const fetch = require("node-fetch")
const redux = require("redux")

const {
  action,
  reducer,
  selector,
  before,
  after,
  replace,
} = require("@highvalley.systems/signalbox")

const log = message => console.log([
  chalk.cyanBright(`[${(new Date).toISOString()}]`),
  message,
].join(" "))

const actions = {
  ...action("listen", ["port"]),
  ...action("importAssets", ["assets"]),
  ...action("downloadAsset", ["asset"]),
  ...action("updateAssets", ["assets"]),
  ...action("request", ["request", "response", "next"]),
  ...action("response", ["request", "response"]),
  ...action("updateClient", ["client"]),
  ...action("updateLua", ["lua"]),
  ...action("updatePackage", ["package"]),
  ...action("updateStylesheet", ["stylesheet"]),
}

const loadBase64 = filename => {
  return Buffer.from(fs.readFileSync(filename)).toString("base64")
}

const defaultFavicon = loadBase64(`${__dirname}/../defaults/favicon.ico`)
const defaultPalette = loadBase64(`${__dirname}/../defaults/palette.png`)
const defaultSpritesheet = loadBase64(`${__dirname}/../defaults/spritesheet.png`)

const defaultAssets = [
  {
    uuid: "favicon.ico",
    name: "favicon.ico",
    imageWidth: 16,
    imageHeight: 16,
    type: "image/vnd.microsoft.icon",
    dataUrl: `data:image/vnd.microsoft.icon;base64,${defaultFavicon}`
  },
  {
    uuid: "palette.png",
    name: "palette.png",
    imageWidth: 4,
    imageHeight: 4,
    type: "image/png",
    dataUrl: `data:image/png;base64,${defaultPalette}`
  },
  {
    uuid: "spritesheet.png",
    name: "spritesheet.png",
    imageWidth: 128,
    imageHeight: 128,
    type: "image/png",
    dataUrl: `data:image/png;base64,${defaultSpritesheet}`
  }
]

const reducers = redux.combineReducers({
  assets: reducer(defaultAssets, {
    importAssets: (assets, action) => {
      return defaultAssets.concat(action.assets.filter(a => !a.deleted))
    },

    updateAssets: (assets, action) => {
      return defaultAssets.concat(action.assets.filter(a => !a.deleted))
    },

    downloadAsset: (assets, action) => assets.map(asset => {
      return asset.uuid === action.asset.uuid ? action.asset : asset
    })
  }),

  client: reducer(fs.readFileSync(`${__dirname}/../engine/itsy.js`, "utf-8"), {
    updateClient: replace("client"),
  }),

  lua: reducer(fs.readFileSync(`${process.cwd()}/itsy.lua`, "utf-8"), {
    updateLua: replace("lua"),
  }),

  package: reducer(JSON.parse(fs.readFileSync(`${__dirname}/../package.json`, "utf-8")), {
    updatePackage: replace("package"),
  }),

  stylesheet: reducer(fs.readFileSync(`${__dirname}/../style.css`, "utf-8"), {
    updateStylesheet: replace("stylesheet"),
  }),
})

const watch = (filename, cb) => {
  fs.watchFile(filename, { interval: 100 }, () => {
    fs.readFile(filename, "utf-8", (error, data) => {
      cb(data)
    })
  })
}

const middlewares = redux.applyMiddleware.apply(null, [
  after("listen", store => store.dispatch(actions.importAssets())),

  after("listen", store => watch(
    `${process.cwd()}/.glitch-assets`,
    assets => store.dispatch(actions.updateAssets(assets))
  )),

  after("listen", store => watch(
    `${__dirname}/../engine/itsy.js`,
    client => store.dispatch(actions.updateClient(client))
  )),

  after("listen", store => watch(
    `${process.cwd()}/itsy.lua`,
    lua => store.dispatch(actions.updateLua(lua))
  )),

  after("listen", store => watch(
    `${__dirname}/../package.json`,
    json => store.dispatch(actions.updatePackage(JSON.parse(json)))
  )),

  after("listen", store => watch(
    `${__dirname}/../style.css`,
    stylesheet => store.dispatch(actions.updateStylesheet(stylesheet))
  )),

  before(/^(import|update)Assets$/, async (store, action) => {
    const cwd = process.cwd()
    const assetsPath = `${cwd}/.glitch-assets`
    const data = fs.readFileSync(assetsPath, "utf-8")
    const lines = data.split(/\n/).filter(l => !!l)
    const assets = lines.map(line => {
      try {
        return JSON.parse(line)
      } catch (e) {
        console.error(e)
      }
    })
    action.assets = assets
  }),

  after(/^(import|update)Assets$/, async (store, action) => {
    const downloads = select.assets.from(store).forDownloading()
    for (const asset of downloads) {
      const response = await fetch(asset.url)
      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer, "binary").toString('base64')
      const dataUrl = `data:${asset.type};base64,${base64}`
      store.dispatch(actions.downloadAsset({ ...asset, dataUrl }))
    }
  }),

  after("request", (store, { request, response, next }) => {
    if (request.method === "GET" && request.url === "/") {
      const config = select.package.from(store).forConfig()
      const client = select.client.from(store).forRunning()
      const lua = select.lua.from(store).forRunning()
      const palette = select.assets.from(store).forPalette().pop()
      const spritesheet = select.assets.from(store).forSpritesheet().pop()
      const stylesheet = select.stylesheet.from(store).forRendering()

      response.send(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
</head>
<body>
<script type="text/lua">
${lua.trimEnd()}
</script>
<img width="4" height="4" src="${palette.dataUrl}" />
<img width="128" height="128" src="${spritesheet.dataUrl}" />
<canvas width="128" height="128"></canvas>
<style type="text/css">
${stylesheet.trim()}
</style>
<script type="text/javascript">
${client.trim()}
</script>
</body>
</html>`)
      return
    }

    if (request.method === "GET" && request.url === "/favicon.ico") {
      const faviconBase64 = select
        .assets
        .from(store)
        .forFavicon()
        .pop()
        .dataUrl
        .split(",")
        .pop()
      const faviconBinary = Buffer
        .from(faviconBase64, "base64")
        .toString("binary")

      response.contentType("image/jpeg")
      response.end(faviconBinary, "binary")
      return
    }

    if (request.method === 'GET' && request.url.match(/^\/itsy-/)) {
      const { version } = select.package.from(store).forConfig()
      if (request.url === `/itsy-${version}.js`) {
        response.setHeader("content-type", "text/javascript")
        fs.createReadStream(`${__dirname}/../engine/itsy.js`).pipe(response)
        return
      }
    }

    next()
  }),

  after("listen", (store, { port }) => log(
    `listening on port ${chalk.magentaBright(port)}`
  )),

  after("importAssets", async (store, { assets }) => log([
    `imported ${chalk.magentaBright(assets.length)}`,
    `asset${assets.length > 1 ? "s" : ""}`,
  ].join(" "))),

  after("downloadAsset", (store, { asset }) => log(
    `downloaded ${chalk.magentaBright(asset.name)}`
  )),

  after("response", (store, { request, response }) => log([
    response.statusCode < 400
      ? chalk.greenBright(response.statusCode)
      : chalk.redBright(response.statusCode),
    request.method,
    request.url,
  ].join(" "))),

  after("updateAssets", () => log(
    `updated ${chalk.magentaBright(".glitch-assets")}`
  )),

  after("updateClient", () => log(
    `updated ${chalk.magentaBright("engine/itsy.js")}`
  )),

  after("updateLua", () => log(
    `updated ${chalk.magentaBright("itsy.lua")}`
  )),

  after("updatePackage", () => log(
    `updated ${chalk.magentaBright("package.json")}`
  )),

  after("updateStylesheet", () => log(
    `updated ${chalk.yellowBright("stylesheet.css")}`
  )),
])

const select = {
  assets: selector("assets", {
    forDownloading: assets => assets
      .filter(asset => asset.dataUrl === undefined),

    forFavicon: assets => assets
      .filter(asset => asset.type === "image/vnd.microsoft.icon")
      .filter(asset => asset.imageWidth === 16)
      .filter(asset => asset.imageHeight === 16)
      .filter(asset => asset.dataUrl !== undefined),

    forPalette: assets => assets
      .filter(asset => asset.type === "image/png")
      .filter(asset => asset.imageWidth === 4)
      .filter(asset => asset.imageHeight === 4)
      .filter(asset => asset.dataUrl !== undefined),

    forSpritesheet: assets => assets
      .filter(asset => asset.type === "image/png")
      .filter(asset => asset.imageWidth === 128)
      .filter(asset => asset.imageHeight === 128)
      .filter(asset => asset.dataUrl !== undefined),
  }),

  client: selector("client", {
    forRunning: client => client,
  }),

  lua: selector("lua", {
    forRunning: lua => lua,
  }),

  package: selector("package", {
    forConfig: package => ({
      version: package.version,
    }),
  }),

  stylesheet: selector("stylesheet", {
    forRendering: stylesheet => stylesheet,
  }),
}

const read = util.promisify(fs.readFile)

const store = redux.createStore(reducers, {}, middlewares)
const app = express()
const port = process.env.PORT || "8080"
const config = select.package.from(store).forConfig()

app.use((req, res, next) => {
  store.dispatch(actions.request(req, res, next))
  res.on('finish', () => {
    store.dispatch(actions.response(req, res))
  })
})

app.listen(port, () => store.dispatch(actions.listen(port)))

