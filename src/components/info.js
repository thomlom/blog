import React from "react"

const Info = ({ children }) => {
  return (
    <div className="bg-blue-100 text-blue-700 border-blue-500 dark:bg-blue-800 dark:text-blue-100 border-l-4 px-4 py-2">
      {children}
    </div>
  )
}

export default Info
