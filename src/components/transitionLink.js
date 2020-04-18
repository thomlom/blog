import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export default ({ paintDrip, ...rest }) => {
  if (paintDrip) {
    return <AniLink paintDrip hex="#B83280" {...rest} />
  }

  return <AniLink cover bg="#B83280" {...rest} />
}
