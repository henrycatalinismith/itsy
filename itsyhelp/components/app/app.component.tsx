import Function from "@highvalley.systems/itsyhelp/components/function"
import Search from "@highvalley.systems/itsyhelp/components/search"
import { selectCurrentPage } from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import Header from "../header"
import Markdown from "../markdown"
import Page from "../page"

interface AppProps {
  navigate: (path: string) => void
  page: HelpPage
}

const mapStateToProps = (state) => ({
  page: selectCurrentPage(state),
})

const mapDispatchToProps = {}

export function App({ page }: AppProps): React.ReactElement {
  return (
    <>
      <Header />
      <Page page={page}>
        {page.path.match(/^\/search$/) ? (
          <Search />
        ) : page.function ? (
          <Function page={page} />
        ) : (
          <Markdown>{page.body}</Markdown>
        )}
      </Page>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
