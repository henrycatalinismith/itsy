import { reducer } from "@highvalley.systems/signalbox"

export default reducer([], {
  loadAsset: (assets, { asset }) => ([
    ...assets,
    asset,
  ])
})

