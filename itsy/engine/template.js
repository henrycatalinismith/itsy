const canvas = document.querySelector("canvas")

const lua = document.querySelector("script[type='text/lua']").innerText

const palette = document
  .querySelector("img[width='8'][height='8']")
  .src.split(",")[1]

const spritesheet = document
  .querySelector("img[width='128'][height='128']")
  .src.split(",")[1]

const argv = [
  lua,
  palette,
  spritesheet,
  `${canvas.offsetWidth}`,
  `${canvas.offsetHeight}`,
]

var Module = {
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
        Module.pauseMainLoop()
      } catch (e) {
        // lololololololol
      }
      requestAnimationFrame(() => {
        window.postMessage(JSON.stringify({
          type: "snapshot",
          uri: canvas.toDataURL("image/png"),
          keys: Object.keys(Module),
        }), "*")
      })
      return
  }
})
