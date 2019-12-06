import { storiesOf } from "@storybook/react"
import React from "react"
import original from "./original.es6"
import secret from "./secret.es6"

const stories = storiesOf("PICO-8", module)

stories.add("[original] [square]", () => (
  <div style={{
    backgroundColor: "#fff",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    height: "100vh",
    gridTemplateRows: "repeat(4, 20vmin)",
    gridTemplateColumns: "repeat(4, 20vmin)",
  }}>
    {original.map(backgroundColor => <div style={{ backgroundColor }} />)}
  </div>
))

stories.add("[secret] [square]", () => (
  <div style={{
    backgroundColor: "#fff",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    height: "100vh",
    gridTemplateRows: "repeat(4, 20vmin)",
    gridTemplateColumns: "repeat(4, 20vmin)",
  }}>
    {secret.map(backgroundColor => <div style={{ backgroundColor }} />)}
  </div>
))

stories.add("[both] [horizontal]", () => (
  <div style={{
    backgroundColor: "#fff",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    height: "100vh",
    gridTemplateRows: "repeat(2, 5vw)",
    gridTemplateColumns: "repeat(16, 5vw)",
  }}>
    {original.map(backgroundColor => <div style={{ backgroundColor }} />)}
    {secret.map(backgroundColor => <div style={{ backgroundColor }} />)}
  </div>
))

stories.add("[both] [vertical]", () => (
  <div style={{
    backgroundColor: "#fff",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    height: "100vh",
    gridTemplateRows: "repeat(2, 5vh)",
    gridTemplateColumns: "repeat(16, 5vh)",
    transform: "rotate(90deg) scaleY(-1)",
  }}>
    {original.map(backgroundColor => <div style={{ backgroundColor }} />)}
    {secret.map(backgroundColor => <div style={{ backgroundColor }} />)}
  </div>
))

