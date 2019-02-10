print('lua!')
frame = 0

function _update()
  frame = frame + 1
  pset(12, 12, frame % 16)
  pset(13, 13, frame % 16)
  pset(14, 14, frame % 16)
end

pset(10, 10, 14)

