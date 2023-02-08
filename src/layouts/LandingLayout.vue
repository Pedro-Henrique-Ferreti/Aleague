<template>
  <TheLandingHeader />
  <div class="landing-layout">
    <slot />
  </div>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheLandingHeader from '@/components/TheLandingHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.landing-layout {
  --landing-footer-height: 4.5rem;
  --layout-padding-top: 6rem;

  display: flex;
  width: 100%;
  min-height: calc(100vh - var(--landing-footer-height));
  padding-top: var(--layout-padding-top);
  padding-bottom: 4rem;
  @include for-desktop-up {
    --layout-padding-top: 8.5rem;
  }
}
</style>
