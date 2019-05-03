import React from "react"
import url from "url"
import Page from "./page"
import Header from "./header"

export default ({ content }) => {
  const defaultPath = location.hash.substring(1) || "/"
  const [path, navigate] = React.useState(defaultPath)

  React.useEffect(() => {
    window.onclick = event => {
      console.log(event)
      const link = event.target.closest("a")
      if (!link) {
        console.log("skip", event.target)
        return
      }
      event.preventDefault()
      location.hash = url.parse(link.href).path
    }

    window.onhashchange = () => {
      const newHash = location.hash.substring(1) || "/"
      navigate(newHash)
    }
  }, [path])

  const page = content[path]

  return (
    <>
      <Header path={path} />
      <Page {...page} />
    </>
  )
}