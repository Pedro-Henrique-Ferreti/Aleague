<template>
  <div class="auth-layout">
    <div class="auth-layout__panel">
      <div class="auth-layout__logo-wrapper container">
        <router-link
          class="focus-ring"
          aria-label="Go to the Home page"
          :to="{ name: 'landing' }"
        >
          <AppLogo class="auth-layout__logo" />
        </router-link>
      </div>
      <main class="auth-layout__card container">
        <slot />
      </main>
    </div>
    <div
      class="auth-layout__banner"
      role="img"
      aria-label="Soccer stadium"
    />
  </div>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue';
</script>

<style lang="scss" scoped>
.auth-layout {
  width: 100%;
  min-height: 100vh;
  background-color: $color--light-gray-3;
  @include for-large-tablet-landscape-up {
   display: flex;
    .container {
      max-width: 24rem;
    }
  }
  &__banner {
    display: none;
    @include for-large-tablet-landscape-up {
      display: block;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('/images/soccer-stadium1920_1080.webp');
    }
  }
  &__panel {
    width: 100%;
    max-width: 23.5rem;
    margin: auto;
    @include for-large-tablet-landscape-up {
      max-width: 35%;
      min-height: 100vh;
      padding-top: 10vh;
      padding-bottom: 3rem;
      margin: unset;
      background-color: $color--white;
      @media (min-height: 900px) {
        padding-top: 16vh;
      }
    }
  }
  &__logo-wrapper {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    @include for-large-tablet-landscape-up {
      padding-top: 0;
      padding-bottom: 2rem;
    }
  }
  &__logo {
    height: 2rem;
  }
  &__card {
    @include for-large-tablet-landscape-down {
      padding-bottom: 2.5rem;
      padding-top: 1.5rem;
      min-height: calc(100vh - 160px);
      background-color: $color--white;
      box-shadow: $shadow--medium;
      border-radius: 0.5rem 2.5rem 0.5rem 2.5rem;
    }
  }
}
</style>
