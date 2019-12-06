import { configure } from "@storybook/react"

const stories = [
  "pico8/pico8.stories.js",
]

function loadStories() {
  stories.forEach(name => require(`../${name}`))
}

configure(loadStories, module)
