import React from "react"
import Page from "../components/page"

export default () => {
  return (
    <Page title="itsy">

      <p>
        itsy is a game engine for making games on mobile devices!
      </p>

      <p>
        You write your game in Lua, and itsy compiles it to one HTML file which
        you can upload and share anywhere.
      </p>

      <p>
        To keep things simple and fun, itsy imposes a few helpful limitations.
        These are the main ones:
      </p>

      <ul>
        <li>128x128 screen</li>
        <li>16 colors</li>
        <li>1 source code file per game</li>
      </ul>

      <p>
        The fixed square aspect ratio is especially helpful as it saves you the
        difficult, detailed work of adapting your games to the huge variety of 
        screen sizes that mobile devices come with.
      </p>

    </Page>
  )
}