#!/usr/bin/env node

const fs = require("fs")
const process = require("process")
const util = require("util")

const chalk = require("chalk")
const express = require("express")
const fetch = require("node-fetch")
const redux = require("redux")

const log = message => console.log([
  chalk.cyanBright(`[${(new Date).toISOString()}]`),
  message,
].join(" "))

const reducer = (initialState, actions) => (state, action) => {
  return state === undefined
    ? initialState
    : actions.hasOwnProperty(action.type)
      ? actions[action.type](state, action)
      : state
}

const before = (actionType, handler) => store => next => action => {
  action.type.match(actionType) && handler.call(null, store, action)
  return next(action)
}

const after = (actionType, handler) => store => next => action => {
  const result = next(action)
  action.type.match(actionType) && handler.call(null, store, action)
  return result
}

const selector = (entity, selectors) => ({
  from: (store) => new Proxy({}, {
    get: (target, name) => {
      return selectors[name].bind(null, (store.getState())[entity])
    }
  })
})

const actions = {
  listen: port => ({
    type: "LISTEN",
    port,
  }),

  importAssets: (assets = {}) => ({
    type: "IMPORT_ASSETS",
    assets,
  }),

  downloadAsset: asset => ({
    type: "DOWNLOAD_ASSET",
    asset,
  }),

  request: (request, response, next) => ({
    type: "REQUEST",
    request,
    response,
    next,
  }),

  response: (request, response) => ({
    type: "RESPONSE",
    request,
    response,
  }),

  updateAssets: assets => ({
    type: "UPDATE_ASSETS",
    assets,
  }),

  updateClient: client => ({
    type: "UPDATE_CLIENT",
    client,
  }),

  updateLua: lua => ({
    type: "UPDATE_LUA",
    lua,
  }),

  updatePackage: pkg => ({
    type: "UPDATE_PACKAGE",
    package: pkg,
  }),

  updateStylesheet: stylesheet => ({
    type: "UPDATE_STYLESHEET",
    stylesheet,
  }),
}

const loadBase64 = filename => {
  return Buffer.from(fs.readFileSync(filename)).toString("base64")
}

const defaultFavicon = loadBase64(`${__dirname}/defaults/favicon.ico`)
const defaultPalette = loadBase64(`${__dirname}/defaults/palette.png`)
const defaultSpritesheet = loadBase64(`${__dirname}/defaults/spritesheet.png`)

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
    IMPORT_ASSETS: (assets, action) => {
      return defaultAssets.concat(action.assets.filter(a => !a.deleted))
    },

    UPDATE_ASSETS: (assets, action) => {
      return defaultAssets.concat(action.assets.filter(a => !a.deleted))
    },

    DOWNLOAD_ASSET: (assets, action) => assets.map(asset => {
      return asset.uuid === action.asset.uuid ? action.asset : asset
    })
  }),

  client: reducer(fs.readFileSync(`${__dirname}/client.js`, "utf-8"), {
    UPDATE_CLIENT: (client, action) => action.client,
  }),

  lua: reducer(fs.readFileSync(`${process.cwd()}/itsy.lua`, "utf-8"), {
    UPDATE_LUA: (lua, action) => action.lua,
  }),

  package: reducer(JSON.parse(fs.readFileSync(`${__dirname}/package.json`, "utf-8")), {
    UPDATE_PACKAGE: (package, action) => action.package,
  }),

  stylesheet: reducer(fs.readFileSync(`${__dirname}/style.css`, "utf-8"), {
    UPDATE_STYLESHEET: (stylesheet, action) => action.stylesheet,
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
  after("LISTEN", store => {
    store.dispatch(actions.importAssets())
  }),

  after("LISTEN", store => watch(`${process.cwd()}/.glitch-assets`, assets => {
    store.dispatch(actions.updateAssets(assets))
  })),

  after("LISTEN", store => watch(`${__dirname}/client.js`, client => {
    store.dispatch(actions.updateClient(client))
  })),

  after("LISTEN", store => watch(`${process.cwd()}/itsy.lua`, lua => {
    store.dispatch(actions.updateLua(lua))
  })),

  after("LISTEN", store => watch(`${__dirname}/package.json`, json => {
    store.dispatch(actions.updatePackage(JSON.parse(json)))
  })),

  after("LISTEN", store => watch(`${__dirname}/style.css`, stylesheet => {
    store.dispatch(actions.updateStylesheet(stylesheet))
  })),

  before(/^(IMPORT|UPDATE)_ASSETS$/, async (store, action) => {
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

  after(/^(IMPORT|UPDATE)_ASSETS$/, async (store, action) => {
    const downloads = select.assets.from(store).forDownloading()
    for (const asset of downloads) {
      const response = await fetch(asset.url)
      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer, "binary").toString('base64')
      const dataUrl = `data:${asset.type};base64,${base64}`
      store.dispatch(actions.downloadAsset({ ...asset, dataUrl }))
    }
  }),

  after("REQUEST", (store, { request, response, next }) => {
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
<script type="application/json">
${JSON.stringify(config, undefined, 2)}
</script>
<script type="text/lua">
${lua.trimEnd()}
</script>
<img width="8" height="8" src="${palette.dataUrl}" />
<img width="128" height="128" src="${spritesheet.dataUrl}" />
<canvas width="128" height="128"></canvas>
<script type="text/javascript">
${client.trim()}
</script>
<style type="text/css">
${stylesheet.trim()}
</style>
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
        fs.createReadStream(`${__dirname}/engine/itsy.js`).pipe(response)
        return
      }

      if (request.url === `/itsy-${version}.wasm`) {
        response.setHeader("content-type", "application/wasm")
        fs.createReadStream(`${__dirname}/engine/itsy.wasm`).pipe(response)
        return
      }
    }

    next()
  }),

  after("LISTEN", (store, { port }) => log(
    `listening on port ${chalk.magentaBright(port)}`
  )),

  after("IMPORT_ASSETS", async (store, { assets }) => log([
    `imported ${chalk.magentaBright(assets.length)}`,
    `asset${assets.length > 1 ? "s" : ""}`,
  ].join(" "))),

  after("DOWNLOAD_ASSET", (store, { asset }) => log(
    `downloaded ${chalk.magentaBright(asset.name)}`
  )),

  after("RESPONSE", (store, { request, response }) => log([
    response.statusCode < 400
      ? chalk.greenBright(response.statusCode)
      : chalk.redBright(response.statusCode),
    request.method,
    request.url,
  ].join(" "))),

  after("UPDATE_ASSETS", () => log(
    `updated ${chalk.magentaBright(".glitch-assets")}`
  )),

  after("UPDATE_CLIENT", () => log(
    `updated ${chalk.magentaBright("client.js")}`
  )),

  after("UPDATE_LUA", () => log(
    `updated ${chalk.magentaBright("itsy.lua")}`
  )),

  after("UPDATE_PACKAGE", () => log(
    `updated ${chalk.magentaBright("package.json")}`
  )),

  after("UPDATE_STYLESHEET", () => log(
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

