import { storiesOf } from "@storybook/react"
import React from "react"

import Glyph from "./glyph.component"

const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{}<>,.?\\|\"':;/~`"

const all = lower + upper + numbers + symbols

const stories = storiesOf("Glyph", module)
const scale = 8

const Grid = ({
  children,
  columns,
  width,
  gap = 8
}) => (
  <div style={{
    display: "grid",
    gridGap: `${gap}px`,
    gridTemplateColumns: [...Array(columns)].map(() => `${width}px`).join(" "),
  }}>
    {children}
  </div>
)

const Center = ({
  children,
  columns,
  width,
  gap = 8
}) => (
  <div style={{
    display: "grid",
    gridGap: `${gap}px`,
    gridTemplateColumns: [...Array(columns)].map(() => `${width}px`).join(" "),
  }}>
    {children}
  </div>
)

stories.addDecorator(story => (
  <Center>
    <Grid columns={5} width={64}>
      {story().map((glyph, i) => (
        <svg
          key={i}
          width={3 * scale}
          height={5 * scale}
          viewBox="0 0 3 5"
          style={{
            border: "8px solid #ccc",
          }}
        >
          {glyph}
        </svg>
      ))}
    </Grid>
  </Center>
))

stories.add("lowercase", () => lower.split("").map((letter, i) => (
  <Glyph>{letter}</Glyph>
)))

stories.add("uppercase", () => upper.split("").map((letter, i) => (
  <Glyph>{letter}</Glyph>
)))

stories.add("numbers", () => numbers.split("").map((letter, i) => (
  <Glyph>{letter}</Glyph>
)))

stories.add("symbols", () => symbols.split("").map((letter, i) => (
  <Glyph>{letter}</Glyph>
)))

stories.add("lowercase [border]", () => lower.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 1,
    color: "#000000",
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 0.9,
    color: "#ffffff",
    x: 0.7,
    y: 0.8,
    width: 0.3,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("uppercase [border]", () => upper.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 1,
    color: "#000000",
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 0.9,
    color: "#ffffff",
    x: 0.7,
    y: 0.8,
    width: 0.3,
  }]}>
    {letter}
  </Glyph>
)))


stories.add("uppercase [another]", () => upper.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 1,
    color: "#000000",
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 1,
    color: "#ffffff",
    x: 0.5,
    y: 0.5,
    width: 0.25,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("lowercase [and another]", () => lower.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.5,
    color: "#000000",
    x: 2,
    y: 2,
    width: 1,
  }, {
    scale: 0.5,
    color: "#ffffff",
    x: 2,
    y: 2,
    width: 0.55,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("uppercase [and another]", () => upper.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.5,
    color: "#000000",
    x: 2,
    y: 2,
    width: 1,
  }, {
    scale: 0.5,
    color: "#ffffff",
    x: 2,
    y: 2,
    width: 0.55,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("lowercase [thicker]", () => lower.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.5,
    color: "#000000",
    x: 2,
    y: 2,
    width: 1.4,
  }, {
    scale: 0.5,
    color: "#ffffff",
    x: 2,
    y: 2,
    width: 0.50,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("uppercase [thicker]", () => upper.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.5,
    color: "#000000",
    x: 2,
    y: 2,
    width: 1.4,
  }, {
    scale: 0.5,
    color: "#ffffff",
    x: 2,
    y: 2,
    width: 0.50,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("numbers [thicker]", () => numbers.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.5,
    color: "#000000",
    x: 2,
    y: 2,
    width: 1.4,
  }, {
    scale: 0.5,
    color: "#ffffff",
    x: 2,
    y: 2,
    width: 0.50,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("lowercase [between]", () => lower.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.7,
    color: "#000000",
    x: 1.1,
    y: 1.6,
    width: 1.2,
  }, {
    scale: 0.7,
    color: "#ffffff",
    x: 1.1,
    y: 1.6,
    width: 0.6,
  }]}>
    {letter}
  </Glyph>
)))

stories.add("uppercase [between]", () => upper.split("").map((letter, i) => (
  <Glyph layers={[{
    scale: 0.7,
    color: "#000000",
    x: 1.1,
    y: 1.6,
    width: 1.2,
  }, {
    scale: 0.7,
    color: "#ffffff",
    x: 1.1,
    y: 1.6,
    width: 0.6,
  }]}>
    {letter}
  </Glyph>
)))
