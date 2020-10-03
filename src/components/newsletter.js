import React from "react"

const Newsletter = ({ title, description }) => {
  const newsletterTitle = title || "Join the newsletter"
  const newsletterDescription =
    description ||
    `I write on tools and productivity to get the most of your developer
        career. Subscribe to the newsletter to get my posts right in your inbox.
        📬`

  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/thomlom"
      method="post"
      target="popupwindow"
      onSubmit={() =>
        window.open("https://buttondown.email/thomlom", "popupwindow")
      }
      className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex w-full flex flex-col shadow-lg rounded-lg p-2 px-4 md:px-20"
    >
      <p className="mt-2 mb-1 leading-tight text-xl sm:text-3xl text-white font-extrabold">
        {newsletterTitle}
      </p>
      <p className="my-1 text-white font-semibold text-sm sm:text-base">
        {newsletterDescription}
      </p>
      <label htmlFor="bd-email" className="flex flex-col mt-2">
        <span className="sr-only">Email</span>
        <input
          type="email"
          name="email"
          id="bd-email"
          className="rounded-lg px-4 py-2 placeholder-gray-600 text-gray-800"
          placeholder="john@doe.com"
        />
      </label>
      <input type="hidden" value="1" name="embed" />
      <input
        type="submit"
        value="Subscribe"
        className="bg-gray-200 text-gray-900 rounded-lg w-full mt-3 font-bold px-3 py-2 cursor-pointer shadow dark:bg-gray-200 dark:text-gray-900 "
      />
      <div className="flex flex-col sm:flex-row justify-between my-2">
        <p className="text-gray-100 text-xs">
          No spams. Unsubscribe at any time.
        </p>
        <a
          href="https://buttondown.email"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-100 text-xs underline font-normal"
        >
          Powered by Buttondown.
        </a>
      </div>
    </form>
  )
}

export default Newsletter
