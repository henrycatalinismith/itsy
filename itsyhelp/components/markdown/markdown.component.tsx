import React from "react"
import marked from "marked"

export interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps): React.ReactElement {
  const html = marked(children)
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export default Markdown
