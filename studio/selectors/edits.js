export default {
  all: edits => edits,
  byId: (edits, id) => edits[id],
  byDiskId: (edits, diskId) => Object
    .values(edits)
    .filter(edit => edit.diskId === diskId),
}

