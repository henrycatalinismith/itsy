document.addEventListener("DOMContentLoaded", () => {
  const body = document.body

  const canvas = document.createElement("canvas")
  const script = document.createElement("script")

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

  script.src = `/itsy.js?${config.version}`
  script.onload = () => {
    Module({
      arguments: argv,
      canvas,
      onRuntimeInitialized: () => {
        console.log('eee')
      }
    }).then(wasm => {
      console.log(wasm)

      /*
      const registerSprite = wasm.cwrap('register_sprite', 'void', [
        'string',
        'number',
        'array',
      ])

      sprites.forEach(sprite => {
        const [, base64] = sprite.src.split(",")
        const ascii = atob(base64)
        const length = ascii.length
        const data = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          data[i] = ascii.charCodeAt(i)
        }

        setTimeout(() => {
          console.log(data)
          registerSprite(sprite.name, length, data)
        }, 1000)

      })
        */

      //setTimeout(() => wasm.abort(), 1000)
      //setTimeout(() => wasm.pauseMainLoop(), 1000)
      //setTimeout(() => wasm.resumeMainLoop(), 2000)
    })
  }

  body.appendChild(canvas)
  body.appendChild(script)
})
