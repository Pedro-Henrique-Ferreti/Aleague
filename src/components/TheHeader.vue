<template>
  <header class="header">
    <div class="header__container container-medium">
      <router-link
        class="header__logo-wrapper"
        :to="{ name: 'home'}"
      >
        <AppLogo />
      </router-link>
      <TheHeaderNav />
    </div>
  </header>
</template>

<script setup>
import AppLogo from './AppLogo.vue';
import TheHeaderNav from './TheHeaderNav.vue';
</script>

<style lang="scss" scoped>
.header {
  height: 4.5rem;
  background-color: $color--white;
  border-bottom: 1px solid $color--light-gray-1;
  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__logo-wrapper {
    @include for-large-tablet-portrait-down {
      display: none;
    }
    @include focus-ring;
  }
}
</style>
