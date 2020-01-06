<template>
  <Layout :has-small-header="true">
    <article class="max-w-full md:max-w-2xl mx-auto py-6 px-4 md:px-0">
      <h1
        class="font-extrabold text-3xl md:text-4xl leading-tight text-gray-800"
      >
        {{ $page.post.title }}
      </h1>
      <date-and-time
        class="mt-3"
        :date="$page.post.date"
        :time="$page.post.timeToRead"
      />
      <g-image
        :alt="`Cover image of ${$page.post.title}`"
        v-if="$page.post.cover"
        :src="$page.post.cover"
        class="rounded mt-4 mx-auto block"
      />
      <div class="post mt-4" v-html="$page.post.content" />
      <a
        :href="tweetLink"
        target="_blank"
        rel="noopener noreferrer"
        class="block border text-center mt-10 bg-primary-700 text-primary-100 p-3 text-xl font-bold rounded cursor-pointer"
      >
        Share on Twitter
      </a>
    </article>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    path
    title
    content
    timeToRead
    date
    description
    cover (width: 1000, blur: 20)
  }
}
</page-query>

<script>
import DateAndTime from "../components/DateAndTime";

export default {
  components: {
    DateAndTime
  },
  metaInfo() {
    const { title, description, cover } = this.$page.post;
    return {
      title,
      meta: [
        { key: "deescription", name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:type", content: cover.src },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: title },
        { property: "twitter:creator", content: "@thomas_lombart" },
        { property: "twitter:description", content: description },
        { property: "twitter:image", content: cover.src }
      ]
    };
  },
  computed: {
    tweetLink() {
      return `https://twitter.com/intent/tweet?text="${this.$page.post.title}"%20by%20@thomas_lombart https://thomlom.dev${this.$page.post.path}`;
    }
  }
};
</script>

<style lang="postcss">
.post h1,
.post h2,
.post h3,
.post h4,
.post h5,
.post h6 {
  @apply mt-6 text-gray-800 font-extrabold leading-tight;
}

.post h1 {
  @apply text-4xl mt-12;
}

.post h2 {
  @apply text-3xl mt-10;
}

.post h3 {
  @apply text-2xl mt-8;
}

.post h4 {
  @apply text-xl;
}

.post code,
.post pre {
  @apply rounded;
}

.post img {
  @apply mx-auto rounded shadow;
}

.post ol,
.post ul,
.post p {
  @apply text-gray-700 text-base leading-relaxed my-6;
}

.post ul {
  @apply list-disc ml-6;
}

.post ol {
  @apply list-decimal ml-6;
}

.post li {
  @apply my-2 pl-1;
}

.post a {
  @apply text-gray-800 font-bold underline;
}

.post a:hover {
  @apply text-gray-900;
}

.post blockquote {
  @apply pl-4 border-l-4 border-secondary-500 italic break-words;
}

.post hr {
  @apply border border-2 border-primary-600;
}

code[class*="language-"],
pre[class*="language-"] {
  color: #abb2bf;
  background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #383e49;
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: #9aa2b1;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}
/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #282c34;
}

/* Inline code */
:not(pre) > code {
  @apply bg-gray-200 text-gray-800 border rounded border-gray-300;
  padding: 2px 4px;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #5c6370;
}

.token.punctuation {
  color: #abb2bf;
}

.token.selector,
.token.tag {
  color: #e06c75;
}

.token.property,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.attr-name,
.token.deleted {
  color: #d19a66;
}

.token.string,
.token.char,
.token.attr-value,
.token.builtin,
.token.inserted {
  color: #98c379;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #56b6c2;
}

.token.atrule,
.token.keyword {
  color: #c678dd;
}

.token.function {
  color: #61afef;
}

.token.regex,
.token.important,
.token.variable {
  color: #c678dd;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre.line-numbers > code {
  position: relative;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em; /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows > span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows > span:before {
  content: counter(linenumber);
  color: #5c6370;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}
</style>
