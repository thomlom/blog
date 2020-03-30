import React from "react"

const Recall = ({ question, answer }) => {
  const [isRevealed, setIsRevealed] = React.useState(false)
  return (
    <div className="p-4 rounded bg-orange-200">
      <p className="text-lg uppercase text-orange-900 font-bold tracking-wide">
        Recall
      </p>
      <p className="italic text-orange-700 leading-tight border-b-2 pb-2 border-orange-600 mt-1">
        Try to answer mentally the question below to make the knowledge stick in
        your brain!{" "}
        <span role="img" aria-label="Brain">
          🧠
        </span>
      </p>
      <p className="text-gray-900 text-xl mt-3 font-semibold">{question}</p>
      {isRevealed ? (
        <p className="text-gray-800 mt-2">{answer}</p>
      ) : (
        <button
          onClick={() => setIsRevealed(true)}
          className="mt-2 bg-orange-800 text-orange-100 px-4 py-2 rounded uppercase tracking-wide text-sm font-semibold"
        >
          Reveal
        </button>
      )}
    </div>
  )
}

export default Recall
