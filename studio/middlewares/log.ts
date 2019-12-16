import { before, after } from "@highvalley.systems/signalbox"

export default [
  after(/.*/, (store, action) => {
    console.log([`[${new Date().toISOString()}]`, `${action.type}`].join(" "))
  }),
]
