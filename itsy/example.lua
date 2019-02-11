print('lua!')
frame = 0

function _update()
  frame = frame + 1
  pset(12, 12, frame % 16)
  pset(13, 13, frame % 16)
  pset(14, 14, frame % 16)
end

pset(10, 10, 14)
line(10, 10, 110, 10, 8)
line(110, 10, 110, 110, 9)
line(110, 110, 10, 110, 10)
line(10, 110, 10, 10, 11)
line(110, 10, 10, 110, 12)

print(2 + 2)
print(abs(2 - 30))
print(3 + 2)


