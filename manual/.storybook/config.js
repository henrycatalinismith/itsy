import "highlight.js/styles/nord.css"
import { addParameters, configure } from "@storybook/react"

const req = require.context(
  `${__dirname}/../components`,
  true,
  /\.stories\.tsx$/
)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addParameters({
  options: {
    showPanel: false,
  },
})

configure(loadStories, module)
