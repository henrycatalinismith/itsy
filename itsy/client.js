document.addEventListener("DOMContentLoaded", () => {
  const body = document.body

  const canvas = document.querySelector("canvas")
  const context = canvas.getContext("2d")
  context.webkitImageSmoothingEnabled = false

  const json = document
    .querySelector("script[type='application/json']")
    .innerText

  const lua = document
    .querySelector("script[type='text/lua']")
    .innerText

  const palette = document
    .querySelector("img[width='8'][height='8']")
    .src
    .split(",")[1]

  const spritesheet = document
    .querySelector("img[width='128'][height='128']")
    .src
    .split(",")[1]

  const config = JSON.parse(json)

  const argv = [lua, palette, spritesheet]

  const script = document.createElement("script")
  script.src = `/itsy-${config.version}.js`
  script.onload = () => {
    Module({
      arguments: argv,
      canvas,
      onRuntimeInitialized: () => console.log("Module.onRuntimeInitialized"),
    }).then(() => console.log("Module.then"))
  }

  body.appendChild(canvas)
  body.appendChild(script)
})
