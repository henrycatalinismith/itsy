import React from "react"
import { storiesOf } from "@storybook/react"
import Regular from "./regular.component"

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

const stories = storiesOf("Regular", module)

stories.addDecorator(story => (
  <Center>
    {story()}
  </Center>
))

stories.add("abcdef", () => (
  <Regular>abcdef</Regular>
))

stories.add("tailbone", () => (
  <Regular>tailbone</Regular>
))

stories.add("nosedive", () => (
  <Regular>nosedive</Regular>
))

stories.add("itsy studio", () => (
  <Regular>itsy studio</Regular>
))

stories.add("highvalley.systems", () => (
  <Regular>highvalley.systems</Regular>
))
