<template>
  <div class="auth-layout | container">
    <div class="auth-layout__card | app-base-card">
      <header class="auth-layout__card-header">
        <router-link
          aria-label="Go to the Home page"
          :to="{ name: 'landing-page' }"
        >
          <AppLogo class="auth-layout__logo" />
        </router-link>
      </header>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppLogo from '@/components/AppLogo.vue';
</script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: $color--neutral-100;
  &__card {
    --base-card--padding: 2.5rem;
    width: 100%;
    max-width: 25rem;
    height: fit-content;
  }
  &__card-header {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
}
</style>
