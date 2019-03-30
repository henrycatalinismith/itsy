import { reducer } from "@highvalley.systems/signalbox"

export default reducer([], {
  load: (assets, { asset }) => ([
    ...assets,
    asset,
  ])
})

