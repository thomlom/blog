<template>
  <div
    class="max-w-3xl mx-auto p-6 md:py-12 md:px-0 flex flex-col items-center sm:flex-row"
  >
    <div
      class="rounded-full bg-primary-300 border-4 border-primary-100 overflow-hidden inline-flex"
    >
      <g-image
        alt="Picture of Thomas Lombart"
        src="~/assets/photo.png"
        class="self-end w-32 sm:w-64"
      />
    </div>
    <div class="mt-4 sm:ml-8 sm:mt-0">
      <p class="text-2xl sm:text-3xl text-primary-100 font-bold leading-tight">
        Hi! I'm Thomas, a front-end engineer.
      </p>
      <p
        class="text-xl sm:text-2xl text-primary-100 mt-2 leading-snug font-semibold"
      >
        I write and speak about code, design and everything in between.
      </p>
      <p
        class="mt-2 sm:mt-3 text-xl sm:text-2xl text-primary-100 leading-snug font-semibold"
      >
        Find me on
        <a
          href="https://twitter.com/thomas_lombart"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
          >Twitter</a
        >
        and
        <a
          href="https://github.com/thomlom"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          GitHub.
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.link {
  @apply underline text-purple-100 p-1;
}
</style>
