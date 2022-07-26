<template>
  <TheLandingHeader />
  <slot />
  <TheFooter class="landing-layout__footer" />
</template>

<script setup>
import TheLandingHeader from '@/components/TheLandingHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.landing-layout__footer {
  margin-top: 4rem;
}
</style>
