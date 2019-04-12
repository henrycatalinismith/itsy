const width = window.innerWidth
const height = window.innerHeight

const canvas = document.querySelector("canvas")
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`

const lua = document.querySelector("script[type='text/lua']").innerText

const palette = document
  .querySelector("img[width='4'][height='4']")
  .src.split(",")[1]

const spritesheet = document
  .querySelector("img[width='128'][height='128']")
  .src.split(",")[1]

const argv = [
  lua,
  palette,
  spritesheet,
  `${width}`,
  `${height}`,
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
