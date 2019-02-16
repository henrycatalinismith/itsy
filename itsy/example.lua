function _init()
 x = -64
 y = -64
end

function _update()
 x = x + 1
 y = y + 1
end

function _draw()
 cls(1)
 camera(x, y)
 pset(64, 64, 7)
end
