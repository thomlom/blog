<template>
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/thomlom"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.email/thomlom', 'popupwindow')"
    class="gradient flex w-full flex flex-col p-5 md:px-32 md:py-6 shadow-lg rounded"
  >
    <h4 class="mt-2 text-2xl text-primary-100 font-extrabold">
      Get my latests posts in your inbox!
    </h4>
    <label for="bd-email" class="flex flex-col mt-2">
      <span class="text-primary-100 uppercase font-bold tracking-wide sr-only"
        >Email</span
      >
      <input
        type="email"
        name="email"
        id="bd-email"
        class="rounded px-4 py-2"
        placeholder="example@domain.com"
      />
    </label>
    <input type="hidden" value="1" name="embed" />
    <input
      type="submit"
      value="Subscribe"
      class="bg-primary-200 text-primary-900 rounded shadow w-full mt-3 font-bold px-3 py-2 cursor-pointer"
    />
    <div class="flex flex-col sm:flex-row justify-between mt-2">
      <p class="text-primary-100 text-xs">No spams. Unsubscribe at any time.</p>
      <p class="text-primary-100 text-xs underline">
        <a href="https://buttondown.email" target="_blank"
          >Powered by Buttondown.</a
        >
      </p>
    </div>
  </form>
</template>
