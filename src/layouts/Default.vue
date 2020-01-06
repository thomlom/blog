<template>
  <div class="font-display font-body min-h-screen flex flex-col">
    <header class="gradient">
      <small-header v-if="hasSmallHeader" />
      <large-header v-else />
    </header>
    <transition name="fade" appear>
      <main class="bg-gray-100">
        <slot />
      </main>
    </transition>
    <!-- <newsletter class="max-w-3xl mx-auto" /> -->
    <footer
      class="bg-gray-200 border border-gray-300 flex justify-center py-6 pt-4 md:pt-8"
    >
      <p class="font-semibold text-gray-700">© 2020 Thomas Lombart</p>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import GitHub from "~/assets/icons/github.png";
import Twitter from "~/assets/icons/twitter.png";
import YouTube from "~/assets/icons/youtube.png";

import LargeHeader from "../components/LargeHeader";
import SmallHeader from "../components/SmallHeader";

export default {
  components: {
    LargeHeader,
    SmallHeader
  },
  props: {
    hasSmallHeader: Boolean
  },
  data() {
    return {
      GitHub,
      Twitter,
      YouTube
    };
  }
};
</script>

<style>
.gradient {
  background: linear-gradient(to bottom right, #8888fc, #3525e6);
}
</style>

<style scoped lang="postcss">
.link {
  @apply underline text-purple-100 p-1;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}
</style>
