const body = document.body
const canvas = document.createElement("canvas")
const json = document.querySelector("script[type='application/json']").innerText
const lua = document.querySelector("script[type='text/lua']").innerText
const script = document.createElement("script")
const style = document.createElement("style")

const config = JSON.parse(json)

script.src = `/itsy.js?${config.version}`
script.onload = () => {
  Module({
    arguments: [lua],
    canvas,
  }).then(wasm => {
    console.log(wasm)
    //setTimeout(() => wasm.abort(), 1000)
    //setTimeout(() => wasm.pauseMainLoop(), 1000)
    //setTimeout(() => wasm.resumeMainLoop(), 2000)
  })
}


style.type = "text/css"
style.appendChild(document.createTextNode(`

  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
  }

  canvas {
    image-rendering: pixelated;
    width: 100vmin;
    height: 100vmin;
  }

`))

body.appendChild(canvas)
body.appendChild(style)
body.appendChild(script)

