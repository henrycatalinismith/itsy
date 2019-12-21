import React from "react"
import marked from "marked"

export function Markdown({ frontMatter, body }): React.ReactElement {
  const { css } = frontMatter
  const html = marked(body)
  return (
    <>
      {css && <style type="text/css">{css}</style>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export default Markdown
