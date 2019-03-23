import { reducer } from "@highvalley.systems/signalbox"

export default reducer({}, {
  load: app => ({
    ...app,
    loading: true,
    ready: false,
  }),

  start: app => ({
    ...app,
    loading: false,
    ready: true,
  })
})

