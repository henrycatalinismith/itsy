import {
  reducer,
  fifo,
  update,
  remove,
} from "@highvalley.systems/signalbox"

import {
  palette,
  spritesheet,
} from "../defaults"

export default reducer({
  id: "default",
  created: (new Date).toISOString(),
  updated: (new Date).toISOString(),
  name: "default",
  lua: "cls(12)\nrect(32, 32, 96, 96, 8)\n",
  palette,
  spritesheet,
  thumbnail: spritesheet,
}, {
  play: (drive, action) => {
    console.log(drive)
    console.log(action)
    return {
      ...action.disk,
    }
  },
})

