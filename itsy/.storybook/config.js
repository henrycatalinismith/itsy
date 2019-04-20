import "highlight.js/styles/nord.css"
import { addParameters, configure } from "@storybook/react"

const req = require.context(`${__dirname}/../stories`, true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    showPanel: false,
  }
})

configure(loadStories, module)
