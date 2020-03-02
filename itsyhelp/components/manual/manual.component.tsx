import {
  currentPage,
  navigate,
} from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import Breadcrumbs from "../breadcrumbs"
import FunctionPage from "../function"
import Header from "../header"
import Markdown from "../markdown"
import Page from "../page"
import Results from "../results"
import Search from "../search"

interface ManualProps {
  navigate: (path: string) => void
  page: HelpPage
}

const mapStateToProps = (state) => ({
  page: currentPage(state),
})

const mapDispatchToProps = {
  navigate,
}

export function Manual({ navigate, page }: ManualProps): React.ReactElement {
  const onHeaderClick = React.useCallback(
    (event) => {
      const link = event.target.closest("a")
      if (link) {
        return
      }
      event.preventDefault()
      navigate("/search")
    },
    [page.path]
  )

  console.log(page)

  return (
    <>
      <Header onClick={onHeaderClick}>
        {page.path.match(/^\/search$/) ? <Search /> : <Breadcrumbs />}
      </Header>
      <Page title={page.title}>
        {page.path.match(/^\/search$/) ? (
          <Results />
        ) : page.function ? (
          <FunctionPage page={page} />
        ) : (
          <Markdown body={page.body} css={page.css} />
        )}
      </Page>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Manual)
