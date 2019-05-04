---
title: itsy
path: /
css: |
  td:first-child a {
    font-size: 32px;
    line-height: 32px;
    padding-right: 8px;
  }

  td:last-child a {
    font-size: 20px;
    line-height: 20px;
  }
---

|                 |                         |
|-----------------|-------------------------|
| ️[🍄][functions] | [functions]             |
| [♻️][game loop] | [game loop]             |

itsy is a game engine for making games on mobile devices!

You write your game in Lua, and itsy compiles it to one HTML file which
you can upload and share anywhere.

To keep things simple and fun, itsy imposes a few helpful limitations.
These are the main ones:

* 128x128 screen
* 16 colors
* 1 source code file per game

The fixed square aspect ratio is especially helpful as it saves you the
difficult, detailed work of adapting your games to the huge variety of 
screen sizes that mobile devices come with.

[functions]: /functions
[game loop]: /game-loop