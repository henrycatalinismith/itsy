import React from "react"
import { Helmet } from "react-helmet"

import Pixelflip from "@highvalley.systems/pixlflip/regular"
import Center from "@highvalley.systems/itsysite/components/center"
import Square from "@highvalley.systems/itsysite/components/square"

// .

export default function Index(): React.ReactElement {
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
