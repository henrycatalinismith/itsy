import React from "react"
import marked from "marked"

export default ({ frontMatter, body }) => {
  const { css } = frontMatter
  const html = marked(body)
  return (
    <>
      {css && (
        <style type="text/css">
          {css}
        </style>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}