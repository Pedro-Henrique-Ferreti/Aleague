<template>
  <TheHeader />
  <UserSettings />
  <AppSnackbar />
  <div class="default-layout">
    <slot />
  </div>
  <TheFooter class="default-layout__footer" />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import UserSettings from '@/components/UserSettings.vue';
import AppSnackbar from '@/components/AppSnackbar.vue';
</script>

<style lang="scss" scoped>
.default-layout {
  min-height: calc(100vh - 4.5rem);
  padding-top: 1rem;
  padding-bottom: 5rem;
  @include for-desktop-up {
    min-height: calc(100vh - 9rem);
    padding: 3.5rem 0;
  }
  &__footer {
    display: none;
    @include for-desktop-up {
      display: block;
    }
  }
}
</style>
