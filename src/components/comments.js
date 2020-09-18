import React from "react"

const Comments = ({ description, defaultDescription = false }) => {
  const utterancesRef = React.useRef()
  const [hasLoadedUtterances, setHasLoadedUtterances] = React.useState(false)

  React.useEffect(() => {
    const utterancesScript = document.createElement("script")
    utterancesScript.async = true
    utterancesScript.src = "https://utteranc.es/client.js"
    utterancesScript.setAttribute("repo", "thomlom/comments")
    utterancesScript.setAttribute("issue-term", "pathname")
    utterancesScript.setAttribute("id", "utterances")
    utterancesScript.setAttribute("theme", "preferred-color-scheme")
    utterancesScript.setAttribute("crossorigin", "anonymous")

    if (utterancesRef) {
      utterancesRef.current.appendChild(utterancesScript)
      setHasLoadedUtterances(true)
    }
  }, [])

  return (
    <>
      {hasLoadedUtterances && (
        <>
          <hr className="my-4 " />
          <h2 className="mb-1 text-gray-800 dark:text-gray-200 font-semibold leading-relaxed">
            {description ||
              "Questions? Thoughts? Leave your comments below. 👇"}
          </h2>
        </>
      )}
      <div ref={utterancesRef}></div>
    </>
  )
}

export default Comments
