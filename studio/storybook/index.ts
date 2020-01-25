import { getStorybookUI, configure } from "@storybook/react-native"

configure(() => {
  require("../components/divider/divider.stories")
  require("../components/editor/editor.stories")
  require("../components/floppy/floppy.stories")
  require("../components/font/font.stories")
  require("../components/play/play.stories")
  require("../components/stop/stop.stories")
}, module)

const StorybookUIRoot = getStorybookUI({})

export default StorybookUIRoot
