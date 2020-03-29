import stream from "stream"
import { Base64Decode } from "base64-stream"
import pico8 from "@highvalley.systems/palettes/pico8/original.es6"
import { Palette } from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import { PNG } from "pngjs"

const width = 4
const height = 4
const rows = _.range(height)
const columns = _.range(width)

const index = (x: number, y: number): number => {
  return (y * width + x) * 4
  return (width * y + x) << 2
}

function rgbHex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16)
  return "#" + (0x1000000 + rgb).toString(16).slice(1)
}

export default async function readPalette(png: string): Promise<Palette> {
  return new Promise((resolve) => {
    const base64Input = new stream.Readable()
    base64Input.push(png.split(",").pop())
    base64Input.push(null)
    base64Input
      .pipe(new Base64Decode())
      .pipe(new PNG({ colorType: 2, width, height, filterType: 4 }))
      .on("parsed", function() {
        const pixels = columns.map((x) =>
          rows.map((y) =>
            rgbHex(
              this.data[index(x, y)],
              this.data[index(x, y) + 1],
              this.data[index(x, y) + 2]
            )
          )
        )

        const palette = _.zipObject(
          _.range(16),
          _.range(16).map((id) => {
            const y = Math.floor(id / 4)
            const x = id % 4
            return {
              id,
              hex: pixels[x][y],
            }
          })
        )

        resolve(palette)
      })
  })
}
