<template>
  <div class="card card-border relative">
    <div class="card-body p-1 grid gap-0.5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
      <div
        v-if="title"
        class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2"
      >
        {{ title }}
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>
