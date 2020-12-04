import React from "react";
import Image from "gatsby-image";

import TransitionLink from "./transitionLink";

const ArticlePreview = ({ node: { fields, frontmatter, excerpt } }) => {
  const { cover, description, tags, title, date } = frontmatter;
  const { slug } = fields;
  const tagsString = tags.join(", ");

  return (
    <article className="flex-1">
      <TransitionLink to={slug}>
        <Image
          fluid={cover.childImageSharp.fluid}
          className="rounded-lg max-h-48"
        />
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-300 uppercase font-semibold">
            <span>{tagsString}</span>
            <span>{date}</span>
          </div>
          <h4 className="text-gray-100 text-xl font-bold mt-3 hover:underline">
            {title}
          </h4>
          <p className="text-gray-300 mt-2">
            {description ? description : excerpt}
          </p>
        </div>
      </TransitionLink>
    </article>
  );
};

export default ArticlePreview;
