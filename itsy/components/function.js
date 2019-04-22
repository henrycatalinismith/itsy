import React from "react"
import Page from "./page"
import Signature from "./signature"
import Input from "./input"
import Output from "./output"
import Examples from "./examples"
import styles from "../stylesheets/function.module.scss"

export default ({
  content = "",
  data: {
    name = "",
    desc = "",
    path = "",
    type = "",
    args, 
    examples, 
    returns,
  }
}) => {
  return (
    <Page title={name}>
      <Signature name={name} args={args} />

      <p className={styles.function__desc}>
        {desc}
      </p>

      {args && <Input>{args}</Input>}
      {returns && <Output {...returns} />}
      <Examples>{examples}</Examples>
    </Page>
  )
}