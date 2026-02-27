<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold mb-0.5">
      {{ title }}
    </h1>
    <p>{{ message }}</p>
    <div class="flex mt-2 w-full items-center justify-center">
      <OpenFileButton class="w-full max-w-12 btn-outline" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  message: string;
}>();
</script>
