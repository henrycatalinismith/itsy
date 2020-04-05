import React from "react"
import marked from "marked"
import styles from "./markdown.module.scss"

export interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps): React.ReactElement {
  const html = marked(children)
  return (
    <div className={styles.component}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default Markdown
