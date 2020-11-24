import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export default ({ paintDrip, ...rest }) => {
  const color = "#011627";

  if (paintDrip) {
    return <AniLink paintDrip hex={color} {...rest} />;
  }

  return <AniLink cover bg={color} {...rest} />;
};
