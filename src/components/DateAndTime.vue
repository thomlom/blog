<template>
  <div class="flex">
    <div class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="icon-calendar w-5"
      >
        <path
          class="fill-current text-gray-500"
          d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"
        />
        <path
          class="fill-current text-gray-800"
          d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"
        />
      </svg>
      <span class="ml-2 uppercase text-gray-700 text-sm">{{
        formatDate(date)
      }}</span>
    </div>
    <div class="flex items-center ml-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="icon-time w-6"
      >
        <circle cx="12" cy="12" r="10" class="fill-current text-gray-400" />
        <path
          class="fill-current text-gray-800"
          d="M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z"
        />
      </svg>
      <span class="ml-2 uppercase text-gray-700 text-sm"
        >{{ time }} minutes read</span
      >
    </div>
  </div>
</template>

<script>
import { format, parse } from "date-fns";

export default {
  props: {
    date: String,
    time: Number
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "dd MMM yyyy");
    }
  }
};
</script>
