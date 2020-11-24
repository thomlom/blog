module.exports = {
  purge: ["./src/**/*.js"],
  variants: {
    margin: ["first", "responsive"],
    extend: {
      transform: ["motion-reduce"],
    },
  },
  theme: {
    scale: {
      103: "1.03",
    },
  },
}
