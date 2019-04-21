import React from "react"

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
    <>
      <h1>{name}</h1>
      <p>{desc}</p>

      {args && (
        <>
          <h2>parameters</h2>
          <table>
            <tbody>
              {args.map((arg, i) => (
                <tr key={arg.name}>
                  <td>{arg.name}</td>
                  <td>&lt;{arg.type}&gt;</td>
                  <td>{arg.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {returns && (
        <>
          <h2>
            returns
            {" "}
            {returns.type}
          </h2>
          <p>{returns.desc}</p>
        </>
      )}

      {examples && (
        <>
          <h2>examples</h2>
          {Object.entries(examples).map(([id, example]) => (
             <React.Fragment key={id}>
               <h3>{id}</h3>

               <pre><code>{example}</code></pre>
             </React.Fragment>
          ))}
        </>
      )}
    </>
  )
}