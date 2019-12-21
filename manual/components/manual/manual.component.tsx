import React from "react"
import marked from "marked"
import { connect } from "react-redux"

import { currentPage, navigate } from "@itsy.studio/manual/store/location"
import { Page as PageType } from "@itsy.studio/types/manual"

import Breadcrumbs from "../breadcrumbs"
import FunctionPage from "../function"
import Header from "../header"
import Markdown from "../markdown"
import Page from "../page"
import Results from "../results"
import Search from "../search"

interface ManualProps {
  navigate: (path: string) => void
  page: PageType
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

/*

  if (path.match(/^\/functions\/.+/)) {
    header = <Breadcrumbs path={path} />
    title = page.frontMatter.title
    body = <Function {...page.frontMatter} />
  } else if (path.match(/^\/search$/)) {
    const onEnter = () => navigate(results[0].frontMatter.path)
    header = <Search query={query} onChange={search} onEnter={onEnter} />
    title = query.length > 0 ? "search" : content["/"].frontMatter.title
    body =
      query.length > 0 ? (
        <Results query={query} results={results} />
      ) : (
        <Markdown {...content["/"]} />
      )
  } else {
    header = <Breadcrumbs path={path} />
    title = page.frontMatter.title
    body = <Markdown {...page} />
  }

  const onHeaderClick = (event) => {
    const link = event.target.closest("a")
    if (link) {
      return
    }
    event.preventDefault()
    navigate("/search")
  }

  return (
    <>
      <Header onClick={onHeaderClick}>{header}</Header>
      <Page title={title}>{body}</Page>
    </>
  )
}
*/

export default connect(mapStateToProps, mapDispatchToProps)(Manual)
