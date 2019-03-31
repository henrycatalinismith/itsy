import { reducer, merge } from "@highvalley.systems/signalbox"

const assign = values => (state, action) => ({
  ...state,
  ...values,
})

export default reducer({}, {
  start: assign({ ready: true }),
  open: merge("diskId"),
  play: assign({ running: true }),
  stop: assign({ running: false }),
  resize: merge("width", "height"),
})

