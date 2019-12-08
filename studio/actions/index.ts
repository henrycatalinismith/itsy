import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("start"),
  ...action("startup", ["disks", "edits"]),
  ...action("load", ["asset"]),
  ...action("new"),
  ...action("open", ["diskId"]),
  ...action("resize", ["width", "height"]),
  ...action("edit", ["disk"]),
  ...action("play", ["disk"]),
  ...action("snap", ["edit"]),
  ...action("stop", []),
  ...action("rename", ["disk"]),
}
