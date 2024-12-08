<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <template v-if="checked">
      <circle cx="10" cy="10" r="10" fill="#F59300" />
      <circle cx="10" cy="10" r="4" fill="white" />
    </template>
    <template v-else>
      <circle cx="10" cy="10" r="9.5" stroke="#ADADAD" />
    </template>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>
