module.exports = {
  variants: {
    margin: ["first", "responsive"],
  },
  theme: {
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
      colors: {
        dark: "#11151F",
        primary: {
          "100": "#E6E6FF",
          "200": "#C4C6FF",
          "300": "#A2A5FC",
          "400": "#8888FC",
          "500": "#7069FA",
          "600": "#5D55FA",
          "700": "#4D3DF7",
          "800": "#3525E6",
          "900": "#1D0EBE",
        },
        secondary: {
          "100": "#EFFCF6",
          "200": "#C6F7E2",
          "300": "#8EEDC7",
          "400": "#65D6AD",
          "500": "#3EBD93",
          "600": "#27AB83",
          "700": "#199473",
          "800": "#147D64",
          "900": "#0C6B58",
        },
      },
    },
  },
}
