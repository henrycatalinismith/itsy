import { configure } from "@storybook/react"

const components = [
  "header",
]

function loadStories() {
  components.forEach(name => require(`../${name}/${name}.stories.js`))
}

configure(loadStories, module)
