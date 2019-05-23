import React from "react"
import marked from "marked"
import { connect } from "react-redux"
import { action } from "@highvalley.systems/signalbox"

import Breadcrumbs from "./breadcrumbs"
import Function from "./function"
import Header from "./header"
import Markdown from "./markdown"
import Page from "./page"
import Results from "./results"
import Search from "./search"

export default connect(
  ({ content, history, query, results }) => ({
    content,
    history,
    query,
    results,
  }), {
    ...action("navigate", ["path"]),
    ...action("search", ["query"]),
  }
)(({
  content,
  history,
  navigate,
  query,
  results,
  search,
}) => {

  const path = history[0]
  const page = content[path]

  let header
  let title
  let body

  if (path.match(/^\/functions\/.+/)) {
    header = <Breadcrumbs path={path} />
    title = page.frontMatter.title
    body = <Function {...page.frontMatter} />
  } else if (path.match(/^\/search$/)) {
    const onEnter = () => navigate(results[0].frontMatter.path)
    header = (
      <Search query={query} onChange={search} onEnter={onEnter} />
    )
    title = "search"
    body = <Results query={query} results={results} />
  } else {
    header = <Breadcrumbs path={path} />
    title = page.frontMatter.title
    body = <Markdown {...page} />
  }

  const onHeaderClick = event => {
    const link = event.target.closest("a")
    if (link) {
      return
    }
    event.preventDefault()
    navigate("/search")
  }

  return (
    <>
      <Header path={path} onClick={onHeaderClick}>
        {header}
      </Header>
      <Page title={title}>
        {body}
      </Page>
    </>
  )
})
