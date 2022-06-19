<template>
  <TheHomeHeader />
  <slot />
  <TheHomeFooter />
</template>

<script setup>
import TheHomeHeader from '@/components/TheHomeHeader.vue';
import TheHomeFooter from '@/components/TheHomeFooter.vue';
</script>
