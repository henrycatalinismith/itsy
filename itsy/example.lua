print('lua!')
frame = 0

function _update()
  frame = frame + 1

  cls()

  sspr(32, 32, 32, 32, 32, 32, 32, 32)

  rectfill(100, 100, 110, 110, 8);

  pset(12, 12, frame % 16)
  pset(13, 13, frame % 16)
  pset(14, 14, frame % 16)

  pset(10, 10, 14)
  line(10, 10, 110, 10, 8)
  line(110, 10, 110, 110, 9)
  line(110, 110, 10, 110, 10)
  line(10, 110, 10, 10, 11)
  line(110, 10, 10, 110, 12)

end

sspr(0, 0, 128, 128, 0, 0, 128, 128)

print(2 + 2)
print(abs(2 - 30))
print(max(1, 2))
print(min(3, 4))
print(pow(3, 3))
print(flr(10.99999999))
print(ceil(99.1))
print(3 + 2)

print('---- random ----')
print(rnd(10))
print(rnd(10))
print(rnd(10))
print(rnd(10))
print(rnd(10))
print('---- /random ----')

local cave = {}
print(#cave)
add(cave, {2, 20})
print(#cave)
print(cave[1][1])
print(cave[1][2])
del(cave, 1)
print(#cave)

print(tonumber("10"))
print(tostring({ 1, 2 }))
print(type(10))

circ(64, 64, 32, 8)

dots = {
  one = { 20, 20 },
  two = { 110, 20 },
}

for k, v in pairs(dots) do
  print(k)
  circ(v[1], v[2], 10, 7)
end

rect(40, 40, 80, 80, 10)

