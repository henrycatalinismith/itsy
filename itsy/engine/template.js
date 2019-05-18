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
  [id]: document.querySelector(`#${id}`),
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

canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
canvas.width = width
canvas.height = height
// canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight)
// canvas.width = 128
// canvas.height = 128

const argv = [
  lua,
  palette,
  spritesheet,
  `${canvas.width}`,
  `${canvas.height}`,
]

var itsy = {
  arguments: argv,
  canvas,
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
}

// itsy.c
//--:Module:--//

document.addEventListener("message", data => {
  window.postMessage(JSON.stringify({ type: "message", ddd: data.data  }), "*")
  const message = JSON.parse(data.data)
  switch (message.type) {
    case "stop":
      try {
        itsy.pauseMainLoop()
      } catch (e) {
        // lololololololol
      }

      const colors = [
        "#000000",
        "#1D2B53",
        "#7E2553",
        "#008751",
        "#AB5236",
        "#5F574F",
        "#C2C3C7",
        "#FFF1E8",
        "#FF004D",
        "#FFA300",
        "#FFEC27",
        "#00E436",
        "#29ADFF",
        "#83769C",
        "#FF77A8",
        "#FFCCAA",
      ]
      const tmp = document.createElement("canvas")
      tmp.width = 128
      tmp.height = 128
      const ctx = tmp.getContext("2d")
      for (let x = 0; x < 128; x++) {
        for (let y = 0; y < 128; y++) {
          const c = itsy._pget(x, y)
          ctx.fillStyle = colors[c]
          ctx.fillRect(x, y, 128, 128)
        }
      }

      window.postMessage(JSON.stringify({
        type: "snapshot",
        uri: tmp.toDataURL("image/png"),
      }), "*")

      return
  }
})
