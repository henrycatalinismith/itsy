import React from "react"
import ReactDOM from "react-dom"

const root = document.createElement("div")
document.body.appendChild(root)

const Help = () => (
  <>
    <h1>help</h1>
    <p>this is the itsy help html file</p>
    <p>the markdown and the components to render it are all ready</p>
    <p>now the build system is almost ready too</p>
    <p>just gotta run this quick + easy proof of concept version through the deploy pipeline once to check it all glues together real nice</p>
    <p>then we can go ahead and start making some magic</p>
  </>
)

ReactDOM.render(<Help />, root)
