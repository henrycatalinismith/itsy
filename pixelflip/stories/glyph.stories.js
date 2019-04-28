import React from "react"
import { storiesOf } from "@storybook/react"
import Center from "../components/center"
import Grid from "../components/grid"
import Glyph from "../components/glyph"

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