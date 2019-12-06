import React from "react"
import { Helmet } from "react-helmet"

import Pixelflip from "@itsy.studio/pixelflip/regular"

import Center from "../components/center"
import Square from "../components/square"

export default () => {
  return (
    <>
      <Helmet>
        <title>itsy studio</title>
      </Helmet>

      <Center>
        <Square>
          <div style={{ display: "flex", flex: 1, paddingLeft: 16 }}>
            <Pixelflip fontSize={32}>itsy studio</Pixelflip>
          </div>
        </Square>
      </Center>
    </>
  )
}
