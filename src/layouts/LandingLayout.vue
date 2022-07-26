<template>
  <TheLandingHeader />
  <slot />
  <TheFooter />
</template>

<script setup>
import TheLandingHeader from '@/components/TheLandingHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>
