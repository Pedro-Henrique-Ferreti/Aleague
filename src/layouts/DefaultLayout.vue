<template>
  <div class="default-layout">
    <TheHeader />
    <div class="container">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.default-layout {
  --footer-height: 3.5rem;
  &__content {
    min-height: calc(100vh - var(--rt-headerHeight) - var(--footer-height));
    padding: 2.5rem 1.5rem;
    background-color: $color--neutral-100;
    border-radius: 2rem;
  }
}
</style>
