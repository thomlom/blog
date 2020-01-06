module.exports = {
  siteName: "Thomlom",
  siteUrl: "https://thomlom.dev",
  siteDescription:
    "Boost your skills by reading high-quality posts and tutorials on modern web development and design.",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./content/blog",
        path: "**/*.md",
        typeName: "Post"
      }
    },
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./src/assets/tailwind.config.js"
      }
    }
  ],
  transformers: {
    remark: {
      plugins: ["@gridsome/remark-prismjs", "gridsome-plugin-remark-youtube"]
    }
  }
};
