import React from "react"
import { storiesOf } from "@storybook/react"
import Center from "../components/center"
import Text from "../components/text"
import pico8 from "../palettes/pico8.es6"

const stories = storiesOf("Text", module)

stories.addDecorator(story => (
  <Center>
    {story()}
  </Center>
))

stories.add("abcdef", () => (
  <Text>abcdef</Text>
))

stories.add("tailbone", () => (
  <Text>tailbone</Text>
))

stories.add("nosedive", () => (
  <Text>nosedive</Text>
))

stories.add("itsy studio", () => (
  <Text>itsy studio</Text>
))

stories.add("highvalley.systems", () => (
  <Text>highvalley.systems</Text>
))
