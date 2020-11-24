const getDifferentComments = (content) => [
  `// ${content}`,
  `//${content}`,
  `/* ${content} */`,
  `/*${content}*/`,
  `<!-- ${content} -->`,
  `<!--${content}-->`,
  `# ${content}`,
  `#${content}`,
];

const hasHighlightComment = (line, content) =>
  line.some((token) => getDifferentComments(content).includes(token.content));
const isStart = (line) => hasHighlightComment(line, "highlight-start");
const isEnd = (line) => hasHighlightComment(line, "highlight-end");
const isLine = (line) => hasHighlightComment(line, "highlight-next-line");

// Return the tokens and if the line should be highlighted or not
export const getAumgentedTokens = (tokens) => {
  let inHighlight = false;
  let shouldHighlightNextLine = false;

  return tokens
    .map((line) => {
      const start = isStart(line);
      const end = isEnd(line);
      const highlightLine = isLine(line);

      if (start) {
        inHighlight = true;
      }

      if (end) {
        inHighlight = false;
      }

      if (highlightLine) {
        shouldHighlightNextLine = true;
      }

      // Return the augmented line: to suppress or to highlight
      if (start || end || highlightLine) {
        return {
          shouldSuppress: true,
          line,
        };
      }

      // If previous line was // highlight-line
      if (shouldHighlightNextLine) {
        shouldHighlightNextLine = false;
        return { isHighlight: true, line };
      }

      return { isHighlight: inHighlight, line };
    })
    .filter(({ shouldSuppress }) => !shouldSuppress);
};
