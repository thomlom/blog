<template>
  <div class="font-display font-body min-h-screen flex flex-col bg-gray-100">
    <header class="gradient">
      <small-header v-if="inPostLayout" />
      <large-header v-else />
    </header>
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <footer
      class="p-4 md:p-0 mb-2 md:mb-6 w-full mx-auto"
      :class="inPostLayout ? 'max-w-2xl md:mt-2' : 'max-w-3xl md:mt-8'"
    >
      <newsletter />
      <p class="mt-4 text-sm text-gray-700 font-medium text-center">
        © 2020 Thomas Lombart
      </p>
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
import Newsletter from "../components/Newsletter";
import SmallHeader from "../components/SmallHeader";

export default {
  components: {
    LargeHeader,
    Newsletter,
    SmallHeader,
  },
  props: {
    inPostLayout: Boolean,
  },
  data() {
    return {
      GitHub,
      Twitter,
      YouTube,
    };
  },
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
