#!/usr/bin/env node

const cp = require("child_process")
const fs = require("fs")
const process = require("process")

const environment = process.env.NODE_ENV || "production"
const isDev = environment === "development"

const colors = require("ansi-colors")
const express = require("express")
const fetch = require("node-fetch")
const redux = require("redux")

let itsy = require("../exports")

const invalidate = filename => {
  const key = require.resolve(filename)
  delete require.cache[key]
}

const run = command => {
  cp.execSync(command, {
    cwd: `${__dirname}/../`,
    stdio: "inherit",
  })
}

const {
  action,
  reducer,
  selector,
  before,
  after,
  replace,
} = require("@highvalley.systems/signalbox")

const log = message => console.log([
  colors.cyanBright(`[${(new Date).toISOString()}]`),
  message,
].join(" "))

const actions = {
  ...action("listen", ["port"]),
  ...action("importAssets", ["assets"]),
  ...action("downloadAsset", ["asset"]),
  ...action("updateAssets", ["assets"]),
  ...action("request", ["request", "response", "next"]),
  ...action("response", ["request", "response"]),
  ...action("updateLua", ["lua"]),

  ...action("updateTemplate"),
  ...action("rebuildTemplate"),

  ...action("updateEngine", ["filename"]),
  ...action("rebuildEngine"),

  ...action("updateStylesheet"),
  ...action("rebuildStylesheet"),
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

  lua: reducer(fs.readFileSync(`${process.cwd()}/itsy.lua`, "utf-8"), {
    updateLua: replace("lua"),
  }),

  name: reducer("", {}),
})

const watch = (filename, cb) => {
  fs.watchFile(filename, { interval: 100 }, () => {
    fs.readFile(filename, "utf-8", (error, data) => {
      cb(data)
    })
  })
}

const middlewares = redux.applyMiddleware.apply(null, [
  before("listen", store => log(
    `starting ${colors.magentaBright(select.name.from(store).asString())}`
  )),

  after("listen", store => store.dispatch(actions.importAssets())),

  after("listen", store => watch(
    `${process.cwd()}/.glitch-assets`,
    assets => store.dispatch(actions.updateAssets(assets))
  )),

  after("listen", store => watch(
    `${process.cwd()}/itsy.lua`,
    lua => store.dispatch(actions.updateLua(lua))
  )),

  after("listen", store => isDev && watch(
    `${__dirname}/../engine/template.js`,
    () => store.dispatch(actions.updateTemplate())
  )),

  after("listen", store => isDev && watch(
    `${__dirname}/../style.css`,
    () => store.dispatch(actions.updateStylesheet())
  )),

  after("updateEngine", store => {
    store.dispatch(actions.rebuildEngine())
  }),

  after("updateStylesheet", store => {
    store.dispatch(actions.rebuildStylesheet())
  }),

  after("updateTemplate", store => {
    store.dispatch(actions.rebuildTemplate())
  }),

  before("rebuildEngine", () => {
    run("rm -f engine/core.js")
    run("rm -f engine/itsy.js")
    run("rm -f base64/engine.js")
    run("make engine/itsy.js")
    run("make base64/engine.js")
  }),

  before("rebuildStylesheet", () => {
    run("rm -f base64/stylesheet.js")
    run("make base64/stylesheet.js")
  }),

  before("rebuildTemplate", () => {
    run("rm -f base64/engine.js")
    run("rm -f engine/itsy.js")
    run("make engine/itsy.js")
    run("make base64/engine.js")
  }),

  after("rebuildEngine", () => {
    invalidate(`${__dirname}/../base64/engine.js`)
    invalidate(`${__dirname}/../base64/index.js`)
    invalidate(`${__dirname}/../index.js`)
    itsy = require("../")
  }),

  after("rebuildStylesheet", () => {
    invalidate(`${__dirname}/../base64/stylesheet.js`)
    invalidate(`${__dirname}/../base64/index.js`)
    invalidate(`${__dirname}/../index.js`)
    itsy = require("../")
  }),

  after("rebuildTemplate", () => {
    invalidate(`${__dirname}/../base64/engine.js`)
    invalidate(`${__dirname}/../base64/index.js`)
    invalidate(`${__dirname}/../index.js`)
    itsy = require("../")
  }),

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
      const name = select.name.from(store).asString()
      const lua = select.lua.from(store).forRunning()
      const palette = select.assets.from(store).forPalette().pop()
      const spritesheet = select.assets.from(store).forSpritesheet().pop()

      response.send(itsy.write({
        name, 
        lua,
        palette: palette.dataUrl.split(",")[1],
        spritesheet: spritesheet.dataUrl.split(",")[1],
      }))
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

    next()
  }),

  after("listen", (store, { port }) => log(
    `listening on port ${colors.magentaBright(port)}`
  )),

  after("importAssets", async (store, { assets }) => log([
    `imported ${colors.magentaBright(assets.length)}`,
    `asset${assets.length > 1 ? "s" : ""}`,
  ].join(" "))),

  after("downloadAsset", (store, { asset }) => log(
    `downloaded ${colors.magentaBright(asset.name)}`
  )),

  after("response", (store, { request, response }) => log([
    response.statusCode < 400
      ? colors.greenBright(response.statusCode)
      : colors.redBright(response.statusCode),
    request.method,
    request.url,
  ].join(" "))),

  after("updateAssets", () => log(
    `updated ${colors.magentaBright(".glitch-assets")}`
  )),

  after("updateLua", () => log(
    `updated ${colors.magentaBright("itsy.lua")}`
  )),

  after("updateEngine", (store, { filename }) => log(
    `updated ${colors.yellowBright(filename)}`
  )),

  after("updateStylesheet", () => log(
    `updated ${colors.yellowBright("stylesheet.css")}`
  )),

  after("updateTemplate", () => log(
    `updated ${colors.yellowBright("template.js")}`
  )),

  after("rebuildEngine", () => log(
    `rebuilt ${colors.yellowBright("base64/engine.js")}`
  )),

  after("rebuildStylesheet", () => log(
    `rebuilt ${colors.yellowBright("base64/stylesheet.js")}`
  )),

  after("rebuildTemplate", () => log(
    `rebuilt ${colors.yellowBright("base64/engine.js")}`
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

  lua: selector("lua", {
    forRunning: lua => lua,
  }),

  name: selector("name", {
    asString: name => name,
  }),

  stylesheet: selector("stylesheet", {
    forRendering: stylesheet => stylesheet,
  }),
}

const initialState = {
  name: process.env.PROJECT_NAME,
}

const store = redux.createStore(reducers, initialState, middlewares)
const app = express()
const port = process.env.PORT || "8080"

app.use((req, res, next) => {
  store.dispatch(actions.request(req, res, next))
  res.on('finish', () => {
    store.dispatch(actions.response(req, res))
  })
})

app.listen(port, () => store.dispatch(actions.listen(port)))
