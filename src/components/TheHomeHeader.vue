<template>
  <header class="home-header container-md">
    <AppLogo />
    <div class="home-header__menu container-sm"
      :class="[menuIsOpen ? 'home-header__menu--open' : '']"
    >
      <hr class="home-header__menu-divider" />
      <BaseButton class="home-header__menu-button">Cadastre-se</BaseButton>
      <BaseButton class="home-header__menu-button"
        color="gray"
      >
        Fazer Login
      </BaseButton>
    </div>
    <BaseButton
      color="gray"
      size="small"
      :icon-left="menuIsOpen ? 'close' : 'menu'"
      @click="menuIsOpen = !menuIsOpen"
    >
      Menu
    </BaseButton>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';

const menuIsOpen = ref(false);
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  &__menu {
    display: none;
    flex-direction: column;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    background-color: $color--white;
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    z-index: 1;
    &--open {
      display: flex;
    }
  }
  &__menu-divider {
    margin-bottom: 1.5rem;
    background-color: $color--light-gray-1;
  }
  &__menu-button:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
