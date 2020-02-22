import React from "react";
import { storiesOf } from "@storybook/react";
import Regular from "./regular.component";

const Center = ({ children, columns, width, gap = 8 }) => (
  <div
    style={{
      display: "grid",
      gridGap: `${gap}px`,
      gridTemplateColumns: [...Array(columns)].map(() => `${width}px`).join(" ")
    }}
  >
    {children}
  </div>
);

const fontSizes = [16, 32, 64, 128];

const examples = [
  "nosedive",
  "tailbone",
  "itsy studio",
  "Itsy Studio",
  "highvalley systems",
  "abcdefghijklm",
  "ABCDEFGHIJKLMN"
];

const stories = storiesOf("Regular", module);

stories.addDecorator(story => <Center>{story()}</Center>);

fontSizes.forEach(fontSize => {
  examples.forEach(example => {
    const name = `[${fontSize}] [${example}]`;
    const props = {
      fontSize,
      children: example
    };
    stories.add(name, () => <Regular {...props} />);
  });
});
