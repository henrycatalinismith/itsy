import React from "react"
import { Helmet } from "react-helmet"

import Header from "../components/header"
import Hero from "../components/hero"
import Square from "../components/square"

export default () => {
  return (
    <>
      <Helmet>
        <title>highvalley.systems</title>
      </Helmet>

      <Header />

      <Hero>
        <div style={{
          flex: 1,
          maxWidth: 512,
        }}>
          <Square bg="/📷/tailbone.png" />
        </div>
      </Hero>

    </>
  )
}
