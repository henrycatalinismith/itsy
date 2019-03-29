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
  canvas
}

// itsy.c
//--:Module:--//


document.addEventListener("message", data => {
  const message = JSON.parse(data.data)
  switch (message.type) {
    case "stop":
      Module.abort()
      return
  }
})
