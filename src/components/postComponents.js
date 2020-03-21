import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

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
    props: { className = "", children },
  },
}) => {
  const matches = className.match(/language-(?<lang>.*)/)

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
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`rounded p-4 my-1 overflow-scroll ${className}`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const textClassNames = "text-gray-700 text-base leading-relaxed my-6"
const titleClassNames = "mt-6 text-gray-800 font-extrabold leading-tight"

// eslint-disable
export default {
  p: props => <p className={textClassNames} {...props} />,
  ul: props => <ul className={`${textClassNames} list-disc ml-6`} {...props} />,
  ol: props => (
    <ol className={`${textClassNames} list-decimal ml-6`} {...props} />
  ),
  li: props => <li className="my-2 pl-1" {...props} />,
  // eslint-disable-next-line
  h1: props => <h1 className={`${titleClassNames} text4xl mt-12`} {...props} />,
  h2: props => (
    // eslint-disable-next-line
    <h2 className={`${titleClassNames} text-3xl mt-10`} {...props} />
  ),
  // eslint-disable-next-line
  h3: props => <h1 className={`${titleClassNames} text-2xl mt-8`} {...props} />,
  // eslint-disable-next-line
  h4: props => <h1 className={`${titleClassNames} text-xl`} {...props} />,
  a: props => (
    // eslint-disable-next-line
    <a
      className="text-gray-800 font-bold underline hover:text-gray-900"
      {...props}
    />
  ),
  hr: props => <hr className="border border-2 border-primary-600" {...props} />,
  blockquote: props => (
    <blockquote
      className="pl-4 border-l-4 border-secondary-500 italic break-word"
      {...props}
    />
  ),
  inlineCode: props => (
    <code
      {...props}
      className="bg-gray-200 text-gray-800 border rounded border-gray-300"
      style={{ padding: "1.75px 3.5px" }}
    />
  ),
  code: CodeBlock,
  pre: CodeBlock,
}
