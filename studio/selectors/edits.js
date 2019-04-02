const asc = (a, b) => a > b ? 1 : a < b ? -1 : 0
const desc = (a, b) => a > b ? -1 : a < b ? 1 : 0

export default {
  all: edits => edits,
  byId: (edits, id) => edits[id],
  byDiskId: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId),

  latest: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId)
    .sort(desc)
    .pop(),

  forHome: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId)
    .filter(edit => (!!edit.snapshot) === true)
    .sort(desc)
    .pop(),

  forPlayer: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId)
    .filter(edit => (!!edit.started) === true)
    .sort(desc)
    .pop(),

  running: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId)
    .filter(edit => (!!edit.started) === true)
    .filter(edit => (!!edit.stopped) === false)
    .pop(),
}

