import React from "react"

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex w-full flex flex-col shadow-lg rounded-lg p-6 sm:py-8 sm:px-12">
      <p className="leading-tight text-2xl sm:text-3xl text-white font-extrabold">
        Contact
      </p>
      <p className="my-1 text-white font-semibold sm:text-xl">
        If you have requests, are interested in collaborating or you just want
        to chat, don't hesitate to reach out!
      </p>
      <a
        href="mailto:t.lombart97@gmail.com"
        className="bg-gray-200 sm:text-lg text-gray-900 text-center rounded-lg w-full mt-3 font-bold p-2 sm:p-3 cursor-pointer shadow"
      >
        Get in touch
      </a>
    </div>
  )
}

export default Contact
