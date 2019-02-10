const canvas = document.createElement("canvas")
document.body.appendChild(canvas)

window.Module = { canvas }
const script = document.createElement("script")
script.src = "/itsy8.js"
script.onload = () => {
  console.log(Module)
  //setTimeout(() => Module.abort(), 1000)
  //setTimeout(() => Module.pauseMainLoop(), 1000)
  //setTimeout(() => Module.resumeMainLoop(), 2000)
}
document.body.appendChild(script)


