import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("change", ["lua"]),
  ...action("impression", []),
  ...action("inject", ["lua"]),
  ...action("ready", ["loading"]),
}

// change
// change
// change
