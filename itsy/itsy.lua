easeout = function(t)
  return t*(2-t)/t
end

level_list = {
  "start",
  "boxes",
  "narrows",
  "start",
  "waves",
  "spikes",
  "waves",
  "spikes",
  "waves",
  "updown",
  "floorup",
  "roofdown",
  "jagged",
  "narrows",
}

levels = {
  start = function(x)
    return { 8, 120 }
  end,

  narrows = function(x)
    local c = 8 + easeout(x/2800) * x/20
    return {
      c,
      127 - c,
    }
  end,

  waves = function(x)
    return {
      30 + sin((x % 190) / 190) * 20,
      90 - sin((x + 128 % 190) / 190) * 20,
    }
  end,

  boxes = function(x)
    if flr(x / 30) % 2 == 0 then
      return { 8, 120 }
    else
      return { 40, 80 }
    end
  end,

  spikes = function(x, t)
    local c = x/10 + (8 * flrrnd(10) * 0.1)
    local f = x/10 + (20 * flrrnd(10) * 0.1)
    return {
      c,
      127 - f,
    }
  end,

  jagged = function(x, t)
    local jag = ((x/10)%5) + (x/10)
    local drop = (t-x)/9
    local c = jag + drop
    local f = x/10 + (10 * flrrnd(10) * 0.1)
    return {
      c,
      127 - c,
    }
  end,

  roofdown = function(x, t)
    local c = 8 + ((x/t) * 50)
    local f = 120 - ((x/t) * 10)
    return {
      c,
      f,
    }
  end,

  floorup = function(x, t)
    local c = 8 + ((x/t) * 10)
    local f = 120 - ((x/t) * 50)
    return {
      c,
      f,
    }
  end,

  updown = function(x, t)
    local c = 8 + ((x/(x+t)) * 10)

    c = c + section(x, t, 1, 4, function(sprg)
      return 20
    end)

    c = c + section(x, t, 2, 4, function(sprg)
      return 10
    end)

    local f = 120 - ((x/t) * 50)
    return {
      c,
      f,
    }
  end,
}

function section(x, t, n, m, fn)
  local prog = x / t
  local slen = n / m
  local sbeg = slen * (n + 1)
  local send = sbeg + slen
  local sprg = (x%slen)/slen
  if prog >= sbeg and prog <= send then
    return fn(sprg)
  else
    return 0
  end
end

function _init()
  tick = 0
  alive = true
  gravity = 0.09
  power = 0.15
  foreground = { 0, 0 }
  position = { 64, 64 }
  velocity = { 2, -1 }
  hitbox = {}
  inclination = "hovering"
  exhaust = {}
  cave = {}
  level = cue_level(level_list[1])
  level_index = 1

  for x = 1,128 do

    --print(cave, 8, 8, 12)
    --print(level(), 8, 16, 12)
    --add(cave, level())
    add(cave, { 8, 120 })
  end
end

function _update()
  tick = tick + 1
  controls()
  if tick % 5 < 4 then
    move_helicopter()
    move_cave()
  end
  --move_exhaust()
  collisions()
end

function _draw()
  cls(0)
  camera(foreground[1], 0)
  draw_cave()
  draw_helicopter()
end

function collisions()
  hitbox = {
    position[1] + 1, position[2],
    position[1] + 14, position[2] + 6,
  }

  start_i = hitbox[1] - foreground[1]
  for i = hitbox[1],hitbox[3] do
    slice = cave[i - foreground[1]]
    if hitbox[2] < slice[1] then
      --alive = false
      velocity = { velocity[1], 0.2 }
      position[2] = slice[1] + 1
    end
    if hitbox[4] > slice[2] then
      --alive = false
      position[2] = slice[2] - 8
      velocity = { velocity[1], -0.8 }
    end
  end
end



function controls()
  if alive and touch() then
    velocity[2] = max(-1.5, velocity[2] - power)
    --sfx(7)
  else
    --sfx(-1)
  end
end

function cue_level(name)
  local length = 128
  local level = {}
  local first = tick

  --local ei = pow(4)
  local t = 30

  local ease = function(a, b)
    local diff = b - a
    local per = diff / t
    local age = tick - first
    local sofar = age * per

    if age < t then
      return a + sofar
    else
      return b
    end
  end

  local generator = function()
    for x = 1,length do
      local s = levels[name](x, length)
      local top = s[1]
      local bottom = s[2]

      if #cave > 1 then
        top = ease(cave[#cave][1], top)
        bottom = ease(cave[#cave][2], bottom)
      end
      add(cave, { top, bottom })
      yield()
    end
  end

  local coroutine = cocreate(generator)

  local level = function()
    if costatus(coroutine) == "dead" then
      next_level()
    else
      coresume(coroutine)
    end
  end

  return level
end

function next_level()
  level_index = (level_index + 1) % #level_list
  level_name = level_list[level_index]
  level = cue_level(level_name)
end

function draw_cave()
    for x,slice in pairs(cave) do
    local sx = foreground[1] + x - 1
    local cy = foreground[2] + slice[1]
    local fy = foreground[2] + slice[2]

    local ceiling_rock_y1 = 0
    local ceiling_rock_y2 = cy
    local floor_rock_y1 = fy
    local floor_rock_y2 = 128

    local ceiling_edge_y1 = cy+1
    local ceiling_edge_y2 = cy+1
    local floor_edge_y1 = fy-1
    local floor_edge_y2 = fy-1

    local ceiling_blur_y1 = cy
    local ceiling_blur_y2 = cy
    local floor_blur_y1 = fy
    local floor_blur_y2 = fy
    
       if x > 1 then
      local pcy = foreground[2]+cave[x-1][1]
      local pfy = foreground[2]+cave[x-1][2]

      if cy > pcy then
        ceiling_blur_y1 = pcy
        ceiling_edge_y1 = pcy+1
      end

      if fy < pfy then
        floor_blur_y1 = pfy
        floor_edge_y1 = pfy-1
      end

      if x > 2 then
        local pcy2 = foreground[2]+cave[x-2][1]
        local pfy2 = foreground[2]+cave[x-2][2]
        if pcy > pcy2 then
          ceiling_blur_y1 = pcy2
        end

        if pfy < pfy2 then
          floor_blur_y1 = pfy2
        end
      end

      if x < #cave and #cave[x+1] == 2 then
        local ncy = foreground[2]+cave[x+1][1]
        local nfy = foreground[2]+cave[x+1][2]

        if cy > ncy then
          ceiling_blur_y1 = ncy
          ceiling_edge_y1 = ncy+1
        end

        if fy < nfy then
          floor_blur_y1 = nfy
          floor_edge_y1 = nfy-1
        end

        if x < #cave - 1 and #cave[x+2] == 2 then
          local ncy2 = foreground[2]+cave[x+2][1]
          local nfy2 = foreground[2]+cave[x+2][2]

          if ncy > ncy2 then
            ceiling_blur_y1 = ncy2
          end

          if nfy < nfy2 then
            floor_blur_y1 = nfy2
          end
        end
      end
    end
    
    local rock_color = 5
    local blur_color = 13
    local ceiling_edge_color = 1
    local floor_edge_color = 1
    local cave_color = 0
    if x > #cave - (128 - position[2] + cy) then
      ceiling_edge_color = 6
    end
    if x > #cave - (position[2] + 128-fy) then
      floor_edge_color = 6
    end
    
    print(sx, 8, 8, 9)
    line(sx, cy, sx, fy, cave_color)
    line(sx, ceiling_rock_y1, sx, ceiling_rock_y2, rock_color)
    line(sx, floor_rock_y1, sx, floor_rock_y2, rock_color)

    if x > 0 and x <= #cave then
      line(sx, ceiling_blur_y1, sx, ceiling_blur_y2, blur_color)
      line(sx, floor_blur_y1, sx, floor_blur_y2, blur_color)
    end

    if x > 1 and x < #cave then
      line(sx, ceiling_edge_y1, sx, ceiling_edge_y2, ceiling_edge_color)
      line(sx, floor_edge_y1, sx, floor_edge_y2, floor_edge_color)
    end
  end
  
  --cls(8)
  
  return
end

function loop(interval, limit)
  remainder = tick % interval
  chunk_size = flr(interval / limit)
  local num = flr(remainder / chunk_size)
  return num
end

function draw_helicopter()
  helicopter_sprite_column = ({
    hovering = 1,
    dropping = 2,
    climbing = 3,
  })[inclination]

  helicopter_sprite_x = ({
    0,
    16,
    32,
    48,
  })[helicopter_sprite_column]

  sspr(
    helicopter_sprite_x, 0,
    16, 8,
    position[1], position[2]
  )

  sspr(
    helicopter_sprite_x + 3, 8+(loop(32,8)*3),
    13, 3,
    position[1] + 3, position[2] - 1
  )

  tail_y_offset = ({
    hovering = 2,
    dropping = 0,
    climbing = 3,
  })[inclination]

  sspr(
    helicopter_sprite_x, 8+loop(8,8)*3 ,
    3, 3,
    position[1], position[2] + tail_y_offset
  )
end

function move_cave()
  for i = 1,velocity[1] do
    del(cave, 1)
  end
  for i = 0,127-#cave do
    level()
  end
end

function move_helicopter()
  velocity[2] = min(1.9, velocity[2] + gravity)
  position[1] = position[1] + velocity[1]
  position[2] = position[2] + velocity[2]
  foreground[1] = position[1] - 32

	 --lol()
  if touch() then
    if velocity[2] >= 0 then
      inclination = "hovering"
    else
      inclination = "climbing"
    end
  else
    if velocity[2] > 0.4 then
      inclination = "dropping"
    else
      inclination = "hovering"
    end
  end
end


