import React from "react"
import { storiesOf } from "@storybook/react"
import Center from "../components/center"
import Grid from "../components/grid"
import Glyph from "../components/glyph"
import pico8 from "../palettes/pico8.es6"

const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{}<>,.?\\|\"':;/~`"

const all = lower + upper + numbers + symbols

const stories = storiesOf("Glyph", module)
const scale = 8

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
    color: pico8[0],
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 0.9,
    color: pico8[7],
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
    color: pico8[0],
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 0.9,
    color: pico8[7],
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
    color: pico8[0],
    x: 0.5,
    y: 0.5,
    width: 1,
  }, {
    scale: 1,
    color: pico8[7],
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
    color: pico8[0],
    x: 2,
    y: 2,
    width: 1,
  }, {
    scale: 0.5,
    color: pico8[7],
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
    color: pico8[0],
    x: 2,
    y: 2,
    width: 1,
  }, {
    scale: 0.5,
    color: pico8[7],
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
    color: pico8[0],
    x: 2,
    y: 2,
    width: 1.4,
  }, {
    scale: 0.5,
    color: pico8[7],
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
    color: pico8[0],
    x: 2,
    y: 2,
    width: 1.4,
  }, {
    scale: 0.5,
    color: pico8[7],
    x: 2,
    y: 2,
    width: 0.50,
  }]}>
    {letter}
  </Glyph>
)))