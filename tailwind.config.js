module.exports = {
  variants: {
    margin: ["first", "responsive"],
  },
  theme: {
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
    },
  },
}
