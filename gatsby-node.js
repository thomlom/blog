const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                next
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMdx.edges

  posts.forEach(
    ({
      node: {
        fields: { slug },
        frontmatter: { next: nextSlug },
      },
    }) => {
      let next
      if (nextSlug) {
        const correspondingPost = posts.find(
          postToFind => postToFind.node.fields.slug === nextSlug
        )

        if (!correspondingPost) {
          throw new Error(
            "A next post slug was specified but no posts were found."
          )
        }

        next = correspondingPost.node
      }

      createPage({
        path: slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug,
          ...(next && { next }),
        },
      })
    }
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
