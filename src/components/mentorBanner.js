import React from "react";

import illustration from "../icons/mentor_illustration.svg";

const MentorBanner = () => (
  <div className="p-5 bg-gray-50 rounded-lg shadow-2xl flex flex-col sm:flex-row">
    <img src={illustration} alt="" className="self-center w-9/12 sm:w-1/4" />
    <div className="mt-4 sm:ml-8 sm:mt-0 space-y-4">
      <p className="text-2xl font-bold text-gray-900 text-center sm:text-left">
        Level up your front-end skills
      </p>
      <p className="text-gray-700 text-center sm:text-left">
        Whether you're learning front-end development, building a web
        application or trying to get a job, I can help. Let's boost your career
        together.
      </p>
      <a
        href="https://mentorcruise.com/mentor/ThomasLombart/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex px-4 py-2 bg-gray-900 text-gray-100 font-bold rounded-lg justify-center items-center w-full sm:w-auto"
      >
        <img
          src="https://cdn.mentorcruise.com/img/cruise_white_small.png"
          className="h-8 w-8"
          alt=""
        />
        <span className="ml-3">Become my mentee</span>
      </a>
    </div>
  </div>
);

export default MentorBanner;
