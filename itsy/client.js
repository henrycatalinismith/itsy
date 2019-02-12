document.addEventListener("DOMContentLoaded", () => {
  const body = document.body
  const canvas = document.createElement("canvas")
  const json = document.querySelector("script[type='application/json']").innerText
  const lua = document.querySelector("script[type='text/lua']").innerText
  const script = document.createElement("script")

  const config = JSON.parse(json)

  script.src = `/itsy.js?${config.version}`
  script.onload = () => {
    Module({
      arguments: [lua],
      canvas,
      onRuntimeInitialized: () => {
        console.log('eee')
      }
    }).then(wasm => {
      console.log(wasm)
      //setTimeout(() => wasm.abort(), 1000)
      //setTimeout(() => wasm.pauseMainLoop(), 1000)
      //setTimeout(() => wasm.resumeMainLoop(), 2000)
    })
  }

  body.appendChild(canvas)
  body.appendChild(script)
})
