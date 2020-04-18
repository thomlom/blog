import React from "react"

const Newsletter = ({ inPost }) => (
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/thomlom"
    method="post"
    target="popupwindow"
    onSubmit={() =>
      window.open("https://buttondown.email/thomlom", "popupwindow")
    }
    className="gradient flex w-full flex flex-col shadow-lg rounded mt-6 p-2 px-4 md:px-24"
  >
    <p className="mt-2 mb-1 leading-tight text-2xl text-gray-100 dark:text-gray-100 font-extrabold">
      {inPost
        ? "Pssst... You can join the newsletter and read an exclusive post!"
        : "Join the newsletter and read an exclusive post!"}
    </p>
    <p
      className="mt-0 mb-1 text-gray-100 dark:text-gray-200 font-semibold"
      v-if="inPost"
    >
      Learn how to get a job as a front-end developer, and get my latest posts
      directly in your inbox{" "}
      <span role="img" aria-label="Face with heart eyes">
        😍
      </span>
    </p>
    <label htmlFor="bd-email" className="flex flex-col mt-2">
      <span className="sr-only">Email</span>
      <input
        type="email"
        name="email"
        id="bd-email"
        className="rounded px-4 py-2 placeholder-gray-600 text-gray-800"
        placeholder="john@doe.com"
      />
    </label>
    <input type="hidden" value="1" name="embed" />
    <input
      type="submit"
      value="Subscribe"
      className="bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900 rounded shadow w-full mt-3 font-bold px-3 py-2 cursor-pointer"
    />
    <div className="flex flex-col sm:flex-row justify-between mt-2">
      <p className="text-gray-300 dark:text-gray-300 text-xs my-1">
        No spams. Unsubscribe at any time.
      </p>
      <a
        href="https://buttondown.email"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 dark:text-gray-300 text-xs underline my-1 font-normal"
      >
        Powered by Buttondown.
      </a>
    </div>
  </form>
)

export default Newsletter
