const body = document.body
const canvas = document.createElement("canvas")
const script = document.createElement("script")
const style = document.createElement("style")

window.Module = { canvas }
script.src = "/itsy8.js"
script.onload = () => {
  console.log(Module)
  //setTimeout(() => Module.abort(), 1000)
  //setTimeout(() => Module.pauseMainLoop(), 1000)
  //setTimeout(() => Module.resumeMainLoop(), 2000)
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

