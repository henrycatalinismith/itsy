import React from "react"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import AspectRatio from "react-aspect-ratio"
import "react-aspect-ratio/aspect-ratio.css"

import { write } from "@itsy.studio/itsy"

import "../../stylesheets/itsy.css"
import styles from "./example.module.scss"

hljs.registerLanguage("lua", lua)

export function Example({ id, code }): React.ReactElement {
  const lua = hljs.highlight("lua", code).value

  const html = write({
    lua: code,
    width: 128 * 2,
    height: 128 * 2,
  })

  return (
    <div className={styles.example}>
      <h3 className={styles.example__heading}>{id}</h3>

      <div className={styles.example__card}>
        <pre className={styles.example__pre}>
          <code
            className={`hljs ${styles.example__code}`}
            dangerouslySetInnerHTML={{
              __html: lua,
            }}
          />
        </pre>
        <AspectRatio ratio="1/1" style={{ flex: 1 }}>
          <iframe className={styles.example__iframe} srcDoc={html} />
        </AspectRatio>
      </div>
    </div>
  )
}

export default Example
