<template>
  <header class="home-header container-md">
    <AppLogo />
    <BaseButton
      size="small"
    >Menu</BaseButton>
  </header>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue';
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
}
</style>
