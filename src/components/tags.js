import React from "react"

const tagsColor = {
  discord: {
    backgroundColor: "#3957BF",
    color: "#FFF",
  },
  react: {
    backgroundColor: "#61DAFB",
    color: "#000",
  },
  javascript: {
    backgroundColor: "#F0DB4F",
    color: "#323330",
  },
  test: {
    backgroundColor: "#BD3030",
    color: "#F2E6E6",
  },
  tooling: {
    backgroundColor: "#21374B",
    color: "#E6ECF2",
  },
  css: {
    backgroundColor: "#A611A4",
    color: "#FFF",
  },
  html: {
    backgroundColor: "#C9350E",
    color: "#FFF",
  },
  vscode: {
    backgroundColor: "#0072CC",
    color: "#fff",
  },
  vue: {
    backgroundColor: "#3DCC8C",
    color: "#35495E",
  },
  career: {
    backgroundColor: "#914E0F",
    color: "#F2ECE6",
  },
  personal: {
    backgroundColor: "#E6E6FF",
    color: "#3525E6",
  },
  performance: {
    backgroundColor: "#404040",
    color: "#E6E6E6",
  },
  design: {
    backgroundColor: "#C71E49",
    color: "#FFFAFB",
  },
  productivity: {
    backgroundColor: "#00CC88",
    color: "#F7FFFC",
  },
}

const Tags = ({ tags }) => (
  <div className="ml-2" style={{ marginTop: "-3px" }}>
    {tags.map((tag) => (
      <span
        key={tag}
        className="first:ml-0 ml-2 inline-block text-xs rounded font-semibold"
        style={{ ...tagsColor[tag], padding: "2px 4px" }}
      >
        {tag}
      </span>
    ))}
  </div>
)

export default Tags
