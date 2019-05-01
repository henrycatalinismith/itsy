import React from "react"
import url from "url"
import Page from "./page"

export default ({ content }) => {
  const defaultPath = location.hash.substring(1) || "/"
  console.log(defaultPath)
  const [path, navigate] = React.useState(defaultPath)

  React.useEffect(() => {
    window.onclick = event => {
      if (event.target.localName !== "a") {
        return
      }
      event.preventDefault()
      const newPath = url.parse(event.target.href).path
      location.hash = newPath
    }

    window.onhashchange = () => {
      const newHash = location.hash.substring(1)
      navigate(newHash)
    }
  }, [])

  const page = content[path]

  return (
    <Page {...page} />
  )
}