<template>
  <TheLandingHeader />
  <slot />
  <TheHomeFooter />
</template>

<script setup>
import TheLandingHeader from '@/components/TheLandingHeader.vue';
import TheHomeFooter from '@/components/TheHomeFooter.vue';
</script>
