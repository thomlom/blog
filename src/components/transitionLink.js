import React from "react"
import useDarkMode from "use-dark-mode"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export default ({ paintDrip, ...rest }) => {
  const { value: isDarkMode } = useDarkMode()

  const color = isDarkMode ? "#f27900" : "#B83280"

  if (paintDrip) {
    return <AniLink paintDrip hex={color} {...rest} />
  }

  return <AniLink cover bg={color} {...rest} />
}
