import React from "react"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import { write } from "../exports/write"
import styles from "../stylesheets/example.module.scss"
import "../stylesheets/itsy.css"

hljs.registerLanguage("lua", lua)

export default ({ id, code }) => {
  const lua = hljs.highlight("lua", code).value
  const html = write({ lua: code })

  return (
    <div className={styles.example}>
      <h3 className={styles.example__heading}>
        {id}
      </h3>

      <div className={styles.example__card}>
        <pre className={styles.example__pre}>
          <code className={`hljs ${styles.example__code}`} dangerouslySetInnerHTML={{
            __html: lua
          }} />
        </pre>
        <div className={styles.example__square}>
        <iframe
          className={styles.example__iframe}
          srcdoc={html}
        />
        </div>
      </div>
    </div>
  )
}