<template>
  <Layout>
    <div class="max-w-3xl p-4 md:p-0 mx-auto mb-10">
      <div
        v-for="post in $page.posts.edges"
        :key="post.node.title"
        class="first:mt-4 md:first:mt-10 mt-10"
      >
        <g-link :to="post.node.path">
          <h3
            class="inline-block text-2xl md:text-3xl text-gray-800 font-bold hover:underline leading-tight"
          >
            {{ post.node.title }}
          </h3>
        </g-link>
        <date-and-time
          class="mt-2"
          :date="post.node.date"
          :time="post.node.timeToRead"
        />
        <p class="mt-4 text-base text-gray-700 leading-relaxed">
          {{ post.node.description }}
        </p>
        <g-link :to="post.node.path">
          <p
            class="inline-block mt-3 text-primary-600 font-bold text-lg hover:underline hover:text-primary-700"
          >
            Read →
          </p>
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Posts { 
    posts: allPost { 
      edges { 
        node {     
          title
          path
          timeToRead
          description
          next
          date 
        } 
      } 
    } 
  }
</page-query>

<script>
import DateAndTime from "../components/DateAndTime";

export default {
  components: {
    DateAndTime,
  },
  metaInfo: {
    title: "All posts",
    meta: [
      {
        key: "description",
        name: "description",
        content:
          "Boost your skills by reading high-quality posts and tutorials on modern web development and design.",
      },
      {
        name: "keywords",
        content: "code, javascript, react, vue, design",
      },
    ],
  },
};
</script>
