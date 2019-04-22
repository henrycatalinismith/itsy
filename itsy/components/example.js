import React from "react"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import styles from "../stylesheets/example.module.scss"
import "../stylesheets/itsy.css"

hljs.registerLanguage("lua", lua)

export default ({ id, code }) => {
  return (
    <div className={styles.example}>
      <h3 className={styles.example__heading}>
        {id}
      </h3>
      <pre className={styles.example__pre}>
        <code className={`hljs ${styles.example__code}`} dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(code).value
        }} />
      </pre>
    </div>
  )
}