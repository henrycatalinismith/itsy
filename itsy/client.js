document.addEventListener("DOMContentLoaded", () => {
  const body = document.body
  const canvas = document.createElement("canvas")
  const json = document.querySelector("script[type='application/json']").innerText
  const lua = document.querySelector("script[type='text/lua']").innerText
  const script = document.createElement("script")

  const config = JSON.parse(json)

  const sprites = Array.prototype.slice.call(document.querySelectorAll("img"))
    .map(img => ({
      name: img.dataset.name,
      src: img.src,
    }))
  console.log(sprites)

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

      const registerSprite = wasm.cwrap('register_sprite', 'void', [
        'string',
        'number',
        'array',
      ])

      sprites.forEach(sprite => {
        const bytes = atob(sprite.src.replace(/^data:image\/png;base64,/, ''))
        const length = bytes.length
        const data = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          data[i] = bytes.charCodeAt(i)
        }

        setTimeout(() => {
          console.log(data)
          registerSprite(sprite.name, length, data)
        }, 1000)
      })

      //setTimeout(() => wasm.abort(), 1000)
      //setTimeout(() => wasm.pauseMainLoop(), 1000)
      //setTimeout(() => wasm.resumeMainLoop(), 2000)
    })
  }

  body.appendChild(canvas)
  body.appendChild(script)
})
