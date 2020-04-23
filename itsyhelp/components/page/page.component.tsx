import Pixlflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import styles from "./page.module.scss"

export interface PageProps {
  children: any
  page: HelpPage
}

export function Page({ children, page }: PageProps): React.ReactElement {
  return (
    <>
      {page.css && <style type="text/css">{page.css}</style>}
      <article className={styles.component}>
        <h1 className={styles.title}>
          <Pixlflip fontSize={24}>{page.title}</Pixlflip>
        </h1>
        <main className={styles.body}>{children}</main>
      </article>
    </>
  )
}

export default Page
