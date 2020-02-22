import React from "react"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import AspectRatio from "react-aspect-ratio"
import "react-aspect-ratio/aspect-ratio.css"

import write from "@highvalley.systems/itsyplay/exports/write"
import { FunctionExample } from "@itsy.studio/types/manual"

import "../../stylesheets/itsy.css"
import styles from "./example.module.scss"

hljs.registerLanguage("lua", lua)

export function Example({ name, lua }: FunctionExample): React.ReactElement {
  const html = write({ lua })

  return (
    <div className={styles.example}>
      <h3 className={styles.example__heading}>{name}</h3>

      <div className={styles.example__card}>
        <pre className={styles.example__pre}>
          <code
            className={`hljs ${styles.example__code}`}
            dangerouslySetInnerHTML={{
              __html: hljs.highlight("lua", lua).value,
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
