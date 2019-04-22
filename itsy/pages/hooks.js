import React from "react"
import Page from "../components/page"
import Section from "../components/section"

export default () => {
  return (
    <Page title="hooks">
    
      <Section title="_init">
        <p>first run</p>
      </Section>

    
      <Section title="_tick">
        <p>every frame</p>
      </Section>

    
      <Section title="_draw">
        <p>draw stuff</p>
      </Section>

    </Page>
  )
}