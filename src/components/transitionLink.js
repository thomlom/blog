import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export default ({ paintDrip, ...rest }) => {
  if (paintDrip) {
    return <AniLink paintDrip hex="#4D3DF7" {...rest} />
  }

  return <AniLink cover bg="#4D3DF7" {...rest} />
}
