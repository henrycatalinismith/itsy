import React from "react";
import Glyph from "../glyph";

export default function Regular({
  children,
  fg = "#ffffff",
  bg = "#000000",
  fontSize = 16,
  Svg = "svg",
  G = "g",
  Path = "path"
}) {
  const style = {
    flex: 1
  };

  const lines = children.split(/\n/);

  const xm = 2.6;

  const first = (() => {
    switch (lines[0][0]) {
      case "w":
        return -0.23;

      default:
        return -0.5;
    }
  })();

  const viewBox = [first, 0, xm * lines[0].length - 1, 4 * lines.length].join(
    " "
  );

  const glyphs = [];
  lines.forEach((line, y) => {
    const chars = line.split("");
    chars.forEach((char, x) => {
      const xScale = 4.8;

      const layers = [
        {
          scale: 0.5,
          color: bg,
          x: x * xScale,
          y: 2,
          width: 1.4
        },
        {
          scale: 0.5,
          color: fg,
          x: x * xScale,
          y: 2,
          width: 0.5
        }
      ];

      const key = `${x}-${y}`;

      const props = {
        key,
        layers,
        G,
        Path
      };

      const glyph = React.createElement(Glyph, props, [char]);
      glyphs.push(glyph);
    });
  });

  const props = {
    style,
    viewBox
  };

  if (fontSize) {
    props.height = `${fontSize}px`;
    props.width = `${(fontSize / 4) * xm * lines[0].length}px`;
  }

  return React.createElement(Svg, props, glyphs);
}
