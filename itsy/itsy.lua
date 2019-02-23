--print('lua!')
frame = 0

function _init()
end

function _update()
  frame = frame + 1

  cls(12)

  camera(0 - flr(frame/2), 0 - flr(frame/2))

  sspr(32, 32, 32, 32, 32, 32, 32, 32)

  rectfill(100, 100, 110, 110, 8);

  pset(12, 12, frame % 16)
  pset(13, 13, frame % 16)
  pset(14, 14, frame % 16)

  pset(0, 0, frame % 15)
  --print(peek(0x6000))

  pset(10, 10, 14)
  line(10, 10, 110, 10, 8)
  line(110, 10, 110, 110, 9)
  line(110, 110, 10, 110, 10)
  line(10, 110, 10, 10, 11)
  line(110, 10, 10, 110, 12)

  print(" !\"#$%&'()*+,-./", 0, 0, 9)
  print("0123456789", 0, 6, 9)
  print(":;<=>?@", 0, 12, 9)
  print("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 0, 18, 9)
  print("[\\]^_`", 0, 24, 9)
  print("abcdefghijklmnopqrstuvwxyz", 0, 30, 9)
  print("{|}~", 0, 36, 9)

  print(tostr(touch()), 0, 48, 9)
end

function _draw()
  if touch() then
    circ(touchx(), touchy(), 32, 14)
  end
end

--cls(7)
sspr(0, 0, 128, 128, 0, 0, 128, 128)

--print(2 + 2)
--print(abs(2 - 30))
--print(max(1, 2))
--print(min(3, 4))
--print(pow(3, 3))
--print(flr(10.99999999))
--print(ceil(99.1))
--print(3 + 2)

--print('---- random ----')
--print(rnd(10))
--print(rnd(10))
--print(rnd(10))
--print(rnd(10))
--print(rnd(10))
--print('---- /random ----')

--local cave = {}
--print(#cave)
--add(cave, {2, 20})
--print(#cave)
--print(cave[1][1])
--print(cave[1][2])
--del(cave, 1)
--print(#cave)

--print(tonumber("10"))
--print(tostring({ 1, 2 }))
--print(type(10))

--circ(64, 64, 32, 8)

--dots = {
  --one = { 20, 20 },
  --two = { 110, 20 },
--}

--for k, v in pairs(dots) do
  --print(k)
  --circ(v[1], v[2], 10, 7)
--end

--rect(40, 40, 80, 80, 10)



