import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

import { getAumgentedTokens } from "./utils"

/**
 * Night Owl theme by Sarah Drasner
 * @see https://github.com/sdras/night-owl-vscode-theme
 */
const theme = {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#011627",
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
      },
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(173, 219, 103)",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(99, 119, 119)",
      },
    },
    {
      types: ["string", "url"],
      style: {
        color: "rgb(173, 219, 103)",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(236, 196, 141)",
      },
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)",
      },
    },
    {
      types: ["builtin", "char", "constant"],
      style: {
        color: "rgb(130, 170, 255)",
      },
    },
    {
      types: ["punctuation", "function", "selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)",
      },
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "rgb(127, 219, 202)",
      },
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)",
      },
    },
    {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)",
      },
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)",
      },
    },
  ],
}

const CodeBlock = ({
  children: {
    props: { children, className },
  },
}) => {
  const matches = className && className.match(/language-(?<lang>.*)/)

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ""
      }
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const augmentedTokens = getAumgentedTokens(tokens)

        return (
          <pre
            className={`rounded-lg py-4 my-2 overflow-x-auto ${className}`}
            style={style}
          >
            {augmentedTokens.map(({ isHighlight, line }, i) => {
              const lineProps = getLineProps({
                line,
                key: i,
                className: "px-4",
              })

              const getTokens = () =>
                line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))

              return isHighlight ? (
                <div key={i} style={{ backgroundColor: "#7497a633" }}>
                  <div {...lineProps}>{getTokens()}</div>
                </div>
              ) : (
                <div {...lineProps} className="px-4">
                  {getTokens()}
                </div>
              )
            })}
          </pre>
        )
      }}
    </Highlight>
  )
}

const textClassNames = "my-4 sm:my-5 text-gray-300 text-base leading-relaxed"
const titleClassNames =
  "mb-2 sm:mb-4 text-gray-200 font-extrabold leading-tight"

// eslint-disable
export default {
  p: (props) => <p className={textClassNames} {...props} />,
  ul: (props) => (
    <ul className={`${textClassNames} list-disc ml-6`} {...props} />
  ),
  ol: (props) => (
    <ol className={`${textClassNames} list-decimal ml-6`} {...props} />
  ),
  li: (props) => <li className="my-2 pl-1" {...props} />,
  h1: (props) => (
    // eslint-disable-next-line
    <h1
      className={`${titleClassNames} text-3xl sm:text-4xl mt-10 sm:mt-12`}
      {...props}
    />
  ),
  h2: (props) => (
    // eslint-disable-next-line
    <h2
      className={`${titleClassNames} text-2xl sm:text-3xl mt-8 sm:mt-10`}
      {...props}
    />
  ),
  h3: (props) => (
    // eslint-disable-next-line
    <h3
      className={`${titleClassNames} text-xl sm:text-2xl mt-6 sm:mt-8`}
      {...props}
    />
  ),
  h4: (props) => (
    // eslint-disable-next-line
    <h4 className={`${titleClassNames} text-xl mt-5 sm:mt-7`} {...props} />
  ),
  a: (props) => (
    // eslint-disable-next-line
    <a
      className="font-bold underline text-gray-300 hover:text-gray-200"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="pl-4 border-l-4 border-gray-400 italic break-word"
      {...props}
    />
  ),
  inlineCode: (props) => (
    <code
      {...props}
      className="bg-gray-900 text-gray-400 border-gray-800 border rounded-lg"
      style={{ padding: "1.75px 3.5px" }}
    />
  ),
  code: CodeBlock,
  pre: CodeBlock,
}
