import { reducer } from "@highvalley.systems/signalbox"

export default reducer({
  running: false,
}, {
  play: itsy => ({
    ...itsy,
    running: true,
  }),

  stop: itsy => ({
    ...itsy,
    running: false,
  }),
})

