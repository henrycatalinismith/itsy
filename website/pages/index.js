import React from "react"
import { Helmet } from "react-helmet"

import Text from "@highvalley.systems/spraypaint/components/text"

import Center from "../components/center"
import Square from "../components/square"

export default () => {
  return (
    <>
      <Helmet>
        <title>itsy studio lolololol</title>
      </Helmet>

      <Center>
        <Square>
          <div style={{ display: "flex", flex: 1, paddingLeft: 16 }}>
            <Text>itsy studio</Text>
          </div>
        </Square>
      </Center>
    </>
  )
}
