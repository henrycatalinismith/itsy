import React from "react"
import { write } from "../exports/write"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"

hljs.registerLanguage("lua", lua)

export default ({ children }) => {
  const lines = children
    .split(/\n/)
    .filter(l => !!l)
    .filter(l => !l.match(/^ +$/))

  const indents = lines.map(line => (
    (line.match(/^( )*/)[0] || "").length
  ))

  const min = Math.min.apply(undefined, indents)

  const lua = lines
    .map(line => line.substring(min))
    .join("\n")

  const html = write({ lua })

  const codeStyle = {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    height: "calc(95vh - 8px * 2)",
    margin: 0,
    padding: "8px",
    lineHeight: 1.5,
    backgroundColor: "#2E3440",
    color: "#D8DEE9",
    border: 0,
  }

  const iframeStyle = {
    flex: 1,
    height: "95vh",
    border: 0,
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <pre style={codeStyle}>
        <code dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(lua).value
        }} />
      </pre>
      <iframe srcdoc={html} style={iframeStyle}
      />
    </div>
  )
}
