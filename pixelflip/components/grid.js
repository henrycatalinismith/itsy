import React from "react"

export default ({
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
