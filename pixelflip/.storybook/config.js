import { configure } from "@storybook/react"

configure(() => {
  require("../glyph/glyph.stories")
  require("../regular/regular.stories")
}, module)
