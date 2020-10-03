import React from "react"

const Note = ({ children }) => {
  return (
    <div className="bg-yellow-200 text-yellow-700 border-yellow-500 dark:bg-yellow-900 dark:text-yellow-100 border-l-4 px-3 py-1 my-4">
      {children}
    </div>
  )
}

export default Note
