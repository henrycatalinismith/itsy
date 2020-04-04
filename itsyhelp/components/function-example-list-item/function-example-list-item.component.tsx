import write from "@highvalley.systems/itsyplay/exports/write"
import { FunctionExample } from "@highvalley.systems/typedefs/itsy"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import React from "react"
import AspectRatio from "react-aspect-ratio"
import "react-aspect-ratio/aspect-ratio.css"
import "../../stylesheets/itsy.css"
import styles from "./function-example-list-item.module.scss"

hljs.registerLanguage("lua", lua)

export function FunctionExampleListItem({
  name,
  lua,
}: FunctionExample): React.ReactElement {
  const html = write({ lua })

  return (
    <div className={styles.component}>
      <h3 className={styles.heading}>{name}</h3>

      <div className={styles.card}>
        <pre className={styles.pre}>
          <code
            className={`hljs ${styles.code}`}
            dangerouslySetInnerHTML={{
              __html: hljs.highlight("lua", lua).value,
            }}
          />
        </pre>
        <AspectRatio ratio="1/1" style={{ flex: 1 }}>
          <iframe className={styles.iframe} srcDoc={html} />
        </AspectRatio>
      </div>
    </div>
  )
}

export default FunctionExampleListItem
